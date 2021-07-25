// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import React from 'react';

import KittyAvatar from './KittyAvatar';
import { useKitty } from './hooks';

export interface Props {
  kittyId?: BN;
}

const LoadKittyAvatar = ({ kittyId }: Props) => {
  const kitty = useKitty(kittyId);

  return (
    kitty?.isSome ? <KittyAvatar dna={kitty.unwrap().data.toU8a()} /> : <div>Loading...</div>
  );
};

export default React.memo(LoadKittyAvatar);
