// Copyright 2017-2021 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useState } from 'react';

import registry from '@polkadot/react-api/typeRegistry';

import AccountSelector from './AccountSelector';
import KittyAvatar from './KittyAvatar';

registry.register({
  ClassId: 'u32',
  ClassInfoOf: 'ClassId',
  Kitty: '[u8; 16]',
  KittyIndex: 'u32',
  KittyIndexOf: 'KittyIndex',
  TokenId: 'u32',
  TokenInfo: {
    metadata: 'Vec<u8>',
    owner: 'AccountId',
    data: 'Kitty' // eslint-disable-line
  },
  TokenInfoOf: 'TokenInfo'
});

function KittiesApp ({ className }: Props): React.ReactElement<Props> {
  const [accountId, setAccountId] = useState<string | null>(null);

  return (
    <main className={className}>
      <AccountSelector onChange={setAccountId} />
      <KittyAvatar dna={[]} />
    </main>
  );
}

export default React.memo(KittiesApp);
