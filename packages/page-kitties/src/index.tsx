// Copyright 2017-2021 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useState } from 'react';

import registry from '@polkadot/react-api/typeRegistry';
import { useApi } from '@polkadot/react-hooks';

import AccountSelector from './AccountSelector';
import KittyViewer from './KittyViewer';

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

  const { api } = useApi();
  const kitties = [
    api.registry.createType('Kitty' as any, new Array(32).fill(1)),
    api.registry.createType('Kitty' as any, new Array(32).fill(2)),
    api.registry.createType('Kitty' as any, new Array(32).fill(3)),
  ];

  return (
    <main className={className}>
      <AccountSelector onChange={setAccountId} />
      <KittyViewer kitties={kitties} />
    </main>
  );
}

export default React.memo(KittiesApp);
