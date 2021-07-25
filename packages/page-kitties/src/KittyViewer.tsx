// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { useApi, useCall } from '@polkadot/react-hooks';

import KittyCard from './KittyCard';
import OwnedKittyViewer from './OwnedKittyViewer';

const Wrapper = styled.section``;
const KittiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  accountId: string | null,
}

const KittyViewer: React.FC<Props> = ({ accountId }: Props) => {
  const { api } = useApi();

  const kittiesCount = useCall<BN>(api.query.nft.nextTokenId, [0]);

  const count = kittiesCount ? kittiesCount.toNumber() : 0;

  const kitties = [];

  for (let i = 0; i < count; ++i) {
    kitties.push(
      <KittyCard
        accountId={accountId}
        key={i}
        kittyId={new BN(i)}
      />
    );
  }

  return (
    <Wrapper>
      <h1>Substrate Kitties</h1>
      <OwnedKittyViewer
        accountId={accountId}
        key={accountId || ''}
      />
      <div>
        <h2>
            Total kitties count: {count}
        </h2>
        <KittiesWrapper>
          { kitties }
        </KittiesWrapper>
      </div>
    </Wrapper>
  );
};

export default React.memo(KittyViewer);
