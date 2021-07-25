// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { useApi, useCall } from '@polkadot/react-hooks';

const Wrapper = styled.section``;

const KittyViewer: React.FC = () => {
  const { api } = useApi();

  const count = useCall<BN>(api.query.nft.nextTokenId, [0]);

  return (
    <Wrapper>
      <h1>Substrate Kitties</h1>
      Kitties Count: {count && count.toString()}
    </Wrapper>
  );
};

export default React.memo(KittyViewer);
