// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import KittyAvatar from './KittyAvatar';
import { Kitty } from './types';

const Wrapper = styled.section``;

interface Props {
  kitties: Array<Kitty>;
}

const KittyViewer: React.FC<Props> = ({ kitties }: Props) => (
  <Wrapper>
    <h1>Substrate Kitties</h1>
    { kitties.length === 0 && 'No kitties'}
    { kitties.map((k) => (
      <KittyAvatar
        dna={k.toU8a()}
        key={k.toHex()}
      />
    )) }
  </Wrapper>
);

export default KittyViewer;
