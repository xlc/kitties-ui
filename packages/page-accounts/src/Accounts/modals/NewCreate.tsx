import React, {useCallback, useMemo, useState} from 'react';
import {ModalProps} from '@polkadot/app-accounts/types';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import {KeypairType} from '@polkadot/util-crypto/types';
import {AddressRow, Button, Checkbox, Dropdown, Input, Modal} from '@polkadot/react-components';
import {useTranslation} from '@polkadot/app-accounts/translate';
import keyring from '@polkadot/ui-keyring';
import {keyExtractSuri, mnemonicGenerate, mnemonicValidate, randomAsU8a} from '@polkadot/util-crypto';
import {DEV_PHRASE} from '@polkadot/keyring/defaults';
import {isHex, u8aToHex} from '@polkadot/util';
import {useApi} from '@polkadot/react-hooks';
import styled from 'styled-components';

interface Props extends ModalProps {
  className?: string;
  onClose: () => void;
  onStatusChange: (status: ActionStatus) => void;
  seed?: string;
  type?: KeypairType;
}

type SeedType = 'bip' | 'raw' | 'dev';

interface AddressState {
  address: string | null;
  deriveError: string | null;
  derivePath: string;
  isSeedValid: boolean;
  pairType: KeypairType;
  seed: string;
  seedType: SeedType;
}

const DEFAULT_PAIR_TYPE = 'sr25519';

function addressFromSeed (phrase: string, derivePath: string, pairType: KeypairType): string {
  return keyring
    .createFromUri(`${phrase.trim()}${derivePath}`, {}, pairType)
    .address;
}

function newSeed (seed: string | undefined | null, seedType: SeedType): string {
  switch (seedType) {
    case 'bip':
      return mnemonicGenerate();
    case 'dev':
      return DEV_PHRASE;
    default:
      return seed || u8aToHex(randomAsU8a());
  }
}

function generateSeed (_seed: string | undefined | null, derivePath: string, seedType: SeedType, pairType: KeypairType = DEFAULT_PAIR_TYPE): AddressState {
  const seed = newSeed(_seed, seedType);
  const address = addressFromSeed(seed, derivePath, pairType);

  return {
    address,
    deriveError: null,
    derivePath,
    isSeedValid: true,
    pairType,
    seed,
    seedType
  };
}

function deriveValidate (seed: string, seedType: SeedType, derivePath: string, pairType: KeypairType): string | null {
  try {
    const { password, path } = keyExtractSuri(`${seed}${derivePath}`);

    // we don't allow soft for ed25519
    if (pairType === 'ed25519' && path.some(({ isSoft }): boolean => isSoft)) {
      return 'Soft derivation paths are not allowed on ed25519';
    }

    // we don't allow password for hex seed
    if (seedType === 'raw' && password) {
      return 'Password are ignored for hex seed';
    }
  } catch (error) {
    return (error as Error).message;
  }

  return null;
}

function isHexSeed (seed: string): boolean {
  return isHex(seed) && seed.length === 66;
}


function rawValidate (seed: string): boolean {
  return ((seed.length > 0) && (seed.length <= 32)) || isHexSeed(seed);
}


function updateAddress (seed: string, derivePath: string, seedType: SeedType, pairType: KeypairType): AddressState {
  const deriveError = deriveValidate(seed, seedType, derivePath, pairType);
  let isSeedValid = seedType === 'raw'
    ? rawValidate(seed)
    : mnemonicValidate(seed);
  let address: string | null = null;

  if (!deriveError && isSeedValid) {
    try {
      address = addressFromSeed(seed, derivePath, pairType);
    } catch (error) {
      isSeedValid = false;
    }
  }

  return {
    address,
    deriveError,
    derivePath,
    isSeedValid,
    pairType,
    seed,
    seedType
  };
}

function NewCreate ({ className = '', onClose, onStatusChange, seed: propsSeed, type: propsType }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isDevelopment } = useApi();
  const [{ address, deriveError, derivePath, isSeedValid, pairType, seed, seedType }, setAddress] = useState<AddressState>(generateSeed(propsSeed, '', propsSeed ? 'raw' : 'bip', propsType));
  const [isMnemonicSaved, setIsMnemonicSaved] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [{ isNameValid, name }, setName] = useState({ isNameValid: false, name: '' });
  const [search, setSearch] = useState<string>('');
  const seedOpt = useMemo(() => (
    isDevelopment
      ? [{ text: t<string>('Development'), value: 'dev' }]
      : []
  ).concat(
    { text: t<string>('Mnemonic'), value: 'bip' },
    { text: t<string>('Raw seed'), value: 'raw' }
  ), [isDevelopment, t]);

  const _onChangeSeed = useCallback(
    (newSeed: string) => setAddress(updateAddress(newSeed, derivePath, seedType, pairType)),
    [derivePath, pairType, seedType]
  );

  const _selectSeedType = useCallback(
    (newSeedType: SeedType): void => {
      if (newSeedType !== seedType) {
        setAddress(generateSeed(null, derivePath, newSeedType, pairType));
      }
    },
    [derivePath, pairType, seedType]
  );

  const _toggleMnemonicSaved = () => {
    setIsMnemonicSaved(!isMnemonicSaved);
  }

  const _nextStep = useCallback(
    () => setStep((step) => step + 1),
    []
  );

  const _onChangeName = useCallback(
    (name: string) => setName({ isNameValid: !!name.trim(), name }),
    []
  );

  const _onChangeSearch = useCallback(
    (search: string) => setSearch(search),
    []
  );

  return (
    <>
      {step === 1 ?
        <Modal
          className={`${className} ui--Modal-Wrapper medium`}
          header={t<string>('Add an account via seed')}
        >
          <Button
            icon='times'
            onClick={onClose}
          />
          <Modal.Content>
            <Modal.Columns>
              <AddressRow
                defaultName={name}
                noDefaultNameOpacity
                value={isSeedValid ? address : ''}
              />
            </Modal.Columns>
            <Modal.Columns>
              <article className={'warning'}>
                <div>{t<string>(`PLEASE WRITE DOWN YOUR WALLET'S MNEMONIC SEED AND KEEP IT IN A SAFE PLACE`)}</div>
              </article>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <Input
                  help={t<string>('The private key for your account is derived from this seed. This seed must be kept secret as anyone in its possession has access to the funds of this account. If you validate, use the seed of the session account as the "--key" parameter of your node.')}
                  isAction
                  isError={!isSeedValid}
                  isReadOnly={seedType === 'dev'}
                  label={
                    seedType === 'bip'
                      ? t<string>('mnemonic seed')
                      : seedType === 'dev'
                      ? t<string>('development seed')
                      : t<string>('seed (hex or string)')
                  }
                  onChange={_onChangeSeed}
                  value={seed}
                >
                  <Dropdown
                    defaultValue={seedType}
                    isButton
                    onChange={_selectSeedType}
                    options={seedOpt}
                  />
                </Input>
              </Modal.Column>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <Checkbox
                  onChange={_toggleMnemonicSaved}
                  value={isMnemonicSaved}
                  label={<>{t<string>('I have saved my mnemonic seed safely')}</>}
                />
              </Modal.Column>
            </Modal.Columns>
          </Modal.Content>
          <Button
            isDisabled={!isMnemonicSaved}
            isSelected={true}
            label={t<string>('Next step')}
            onClick={_nextStep}
          />
        </Modal>
        :
        <Modal
          className={className}
          header={t<string>('Add multisig')}
          size='large'
        >
          <Button
            icon='times'
            onClick={onClose}
          />
          <Modal.Content>
            <Modal.Columns>
              <Modal.Column>
                <Input
                  autoFocus
                  help={t<string>('Name given to this account. You can edit it. To use the account to validate or nominate, it is a good practice to append the function of the account in the name, e.g "name_you_want - stash".')}
                  isError={!isNameValid}
                  label={t<string>('A NAME FOR YOUR MULTISIG ACCOUNT')}
                  onChange={_onChangeName}
                  placeholder={t<string>('Account Name')}
                  value={name}
                />
              </Modal.Column>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <Input
                  autoFocus
                  label={t<string>('SELECT SIGNATORIES')}
                  onChange={_onChangeSearch}
                  placeholder={t<string>('Search')}
                  value={search}
                />
              </Modal.Column>
            </Modal.Columns>
          </Modal.Content>
          <Button
            isSelected={true}
            label={t<string>('Create an account')}
            onClick={_nextStep}
          />
        </Modal>}
    </>
  )
}

export default styled(NewCreate)`
  &.ui--Modal-Wrapper.medium {
    width: 655px;
  }
  &&.ui--Modal-Wrapper {
    border-radius: 0;
    background: #FAFAFA;

    .ui--Button:not(.hasLabel) {
      position: absolute;
      top: 15px;
      right: 15px;

      svg {
        background: none;
        color: #000;
      }
    }
    .warning {
      width: 100%;
      padding: 0.7rem 0.9rem 0.6rem 2.9rem;
      margin: 0;
      background: rgba(232, 111, 0, 0.08);
      border: 0;
      border-radius: 4px;
      font-weight: 800;
      font-size: 10px;
      line-height: 14px;
      color: #E86F00;
    }
  }
  &&.ui--Modal-Wrapper > div.header {
    padding: 1.5rem 2.60rem 0 1.75rem;
    font-size: 1.45rem;
    line-height: 1.75rem;
    color: #000000;
  }
`;
