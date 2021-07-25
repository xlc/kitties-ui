// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { useApi, useCall } from '@polkadot/react-hooks';
import { Option } from '@polkadot/types/codec';
import { Balance } from '@polkadot/types/interfaces';

import { TokenInfo } from './types';

export type Props = {
  kittyId: BN,
  kitty?: Option<TokenInfo>
};

export const useKitty = (kittyId?: BN | string): Option<TokenInfo> | undefined => {
  const { api } = useApi();

  return useCall<Option<TokenInfo>>(api.query.nft.tokens, [0, kittyId]);
};

export const useKittyPrice = (kittyId?: BN | string): Option<Balance> | undefined => {
  const { api } = useApi();

  return useCall<Option<Balance>>(api.query.kitties.kittyPrices, [kittyId]);
};
