// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { useApi, useCall } from '@polkadot/react-hooks';
import { Option } from '@polkadot/types/codec';

import { TokenInfo } from './types';

export type Props = {
  kittyId: BN,
  kitty?: Option<TokenInfo>
};

export const useKitty = (kittyId?: BN): Option<TokenInfo> | undefined => {
  const { api } = useApi();

  return useCall<Option<TokenInfo>>(api.query.nft.tokens, [0, kittyId]);
};
