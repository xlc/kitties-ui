// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { useApi, useCall } from '@polkadot/react-hooks';

import KittyCard from './KittyCard';

const Wrapper = styled.section``;
const KittiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const KittyViewer: React.FC = () => {
  const { api } = useApi();

  const kittiesCount = useCall<BN>(api.query.nft.nextTokenId, [0]);

  const count = kittiesCount ? kittiesCount.toNumber() : 0;

  const kitties = [];

  for (let i = 0; i < count; ++i) {
    kitties.push(
      <KittyCard
        key={i}
        kittyId={new BN(i)}
      />
    );
  }

  return (
    <Wrapper>
      <h1>Substrate Kitties</h1>
      <h2>
           Total kitties count: {count}
      </h2>
      <KittiesWrapper>
        { kitties }
      </KittiesWrapper>
    </Wrapper>
  );
};

export default React.memo(KittyViewer);
