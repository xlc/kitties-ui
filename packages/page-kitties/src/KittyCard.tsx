// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { AddressMini, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { Option } from '@polkadot/types';
import { Balance } from '@polkadot/types/interfaces';
import { formatBalance, u8aToHex } from '@polkadot/util';

import { useKitty, useKittyPrice } from './hooks';
import KittyAvatar from './KittyAvatar';
import { TokenInfo } from './types';

const Wrapper = styled.div`
   border: 2px solid #eee;
   padding: 10px;
   border-radius: 8px;
   margin: 10px;
   width: 333px;
 `;

const StyledKittyAvatar = styled(KittyAvatar)`
   margin: auto;
 `;

const Line = styled.div`
   height: 2px;
   background: #eee;
   margin: 10px -10px;
 `;

interface Props {
  kittyId?: BN | string;
  accountId: string | null;
  showUnlist?: boolean;
  showBuy?: boolean;
}

type PriceProps = Props & {
  price?: Option<Balance>;
  kitty?: Option<TokenInfo>;
};

const Price: React.FC<PriceProps> = ({ accountId, kitty, kittyId, price, showBuy, showUnlist }: PriceProps) => {
  const { api } = useApi();

  if (price && price.isSome) {
    const value = price.unwrap();

    return (
      <>
        <label>Price: {formatBalance(value)}</label>
        {showUnlist &&
          <TxButton
            accountId={accountId}
            icon='undo'
            label='Unlist'
            params={[kittyId, null]}
            tx={api.tx.kitties.setPrice}
          />
        }
        {showBuy &&
            <TxButton
              accountId={accountId}
              label='Buy'
              params={[kitty?.unwrap().owner, kittyId, value]}
              tx={api.tx.kitties.buy}
            />
        }
      </>
    );
  }

  return <label>Not for sale</label>;
};

const KittyCard: React.FC<Props> = ({ kittyId, ...others }: Props) => {
  const maybeKitty = useKitty(kittyId);
  const price = useKittyPrice(kittyId);

  if (maybeKitty?.isSome) {
    const kitty = maybeKitty.unwrap();
    const dna = kitty.data.toU8a();
    const gender = dna[0] % 2 === 0 ? 'Male' : 'Female';

    return (
      <Wrapper>
        <StyledKittyAvatar dna={dna} />
        <Line />
        <label>Kitty ID: {kittyId?.toString()}</label>
        <label>
          Owner:&nbsp;
          <AddressMini
            value={kitty.owner}
          />
        </label>
        <label>DNA: {u8aToHex(dna)}</label>
        <label>Gender: {gender}</label>
        <Price {...{ kitty: maybeKitty, kittyId, price, ...others } }/>
      </Wrapper>
    );
  }

  return <div>Loading...</div>;
};

export default React.memo(KittyCard);
