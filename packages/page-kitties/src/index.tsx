// Copyright 2017-2021 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React from 'react';

import registry from '@polkadot/react-api/typeRegistry';

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

function KittiesApp (): React.ReactElement<Props> {
  return (
    <main>
      Kitties App
    </main>
  );
}

export default React.memo(KittiesApp);
