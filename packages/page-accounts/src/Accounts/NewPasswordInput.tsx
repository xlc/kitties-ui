// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useCallback, useState } from 'react';
import { Password, PasswordStrength } from '@polkadot/react-components';
import keyring from '@polkadot/ui-keyring';

import { useTranslation } from '../translate';

type Props = {
  password: string;
  onChange: (password: string, isPasswordValid: boolean) => void;
}

export default function NewPasswordInput ({ onChange, password }: Props): React.ReactElement {
  const { t } = useTranslation();
  const [isPassValid, setPassValid] = useState<boolean>(false);
  const [{ isPass2Valid, password2 }, setPassword2] = useState({ isPass2Valid: false, password2: '' });

  const _onPasswordChange = useCallback(
    (password: string) => {
      const isPassValid = keyring.isPassValid(password);

      setPassValid(isPassValid);

      const isValid = isPassValid && isPass2Valid;

      onChange(password, isValid);
    },
    [onChange, isPass2Valid]
  );

  const onPassword2Change = useCallback(
    (password2: string) => {
      const isPass2Valid = keyring.isPassValid(password2) && (password2 === password);

      setPassword2({ isPass2Valid, password2 });

      const isValid = isPassValid && isPass2Valid;

      onChange(password, isValid);
    },
    [password, onChange, isPassValid]
  );

  return (
    <>
      <Password
        className='full'
        help={t<string>('This password is used to encrypt your private key. It must be strong and unique! You will need it to sign transactions with this account. You can recover this account using this password together with the backup file (generated in the next step).')}
        isError={!isPassValid}
        label={t<string>('A NEW PASSWORD TO THIS ACCOUNT')}
        onChange={_onPasswordChange}
        value={password}
      />
      <Password
        className='full'
        help={t<string>('Verify the password entered above.')}
        isError={!isPass2Valid}
        label={t<string>('A NEW PASSWORD TO THIS ACCOUNT')}
        onChange={onPassword2Change}
        value={password2}
      />
      <PasswordStrength value={password} />
    </>
  );
}
