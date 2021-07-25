// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Struct, u8, U8aFixed, u32, Vec } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';

export type Kitty = U8aFixed
export type KittyIndex = u32
export interface TokenInfo extends Struct {
  metadata: Vec<u8>;
  owner: AccountId;
  data: Kitty;
}

export interface ComponentProps {
  className?: string;
}
