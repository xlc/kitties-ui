// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { AddressMini } from '@polkadot/react-components';
import { u8aToHex } from '@polkadot/util';

import { useKitty } from './hooks';
import KittyAvatar from './KittyAvatar';

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
}

const KittyCard: React.FC<Props> = ({ kittyId }: Props) => {
  const maybeKitty = useKitty(kittyId);

  if (maybeKitty?.isSome) {
    const kitty = maybeKitty.unwrap();
    const dna = kitty.data.toU8a();

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
      </Wrapper>
    );
  }

  return <div>Loading...</div>;
};

export default React.memo(KittyCard);
