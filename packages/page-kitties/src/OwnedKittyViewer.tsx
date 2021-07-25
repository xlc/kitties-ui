// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useApi } from '@polkadot/react-hooks';

import KittyCard from './KittyCard';

const KittiesWrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   &:empty {
     &:after {
       content: "You don't have any kitties";
       margin-bottom: 15px;
       font-size: 1.2em;
     }
   }
 `;

  type Props = {
    accountId: string | null,
  };

const OwnedKittyViewer: React.FC<Props> = ({ accountId }: Props) => {
  const [kittyIds, setKittyIds] = useState<string[]>([]);
  const { api } = useApi();

  useEffect(() => {
    if (!accountId) {
      return;
    }

    api.query.nft.tokensByOwner.keys(accountId)
      .then((ids) => {
        const kittyIds = ids.map((id) => (id.toHuman() as string[][])[1][1]);

        kittyIds.sort();
        setKittyIds(kittyIds);
      })
      .catch(console.log);
  }, [api, accountId, setKittyIds]);

  if (!accountId) {
    return <span />;
  }

  return (
    <div>
      <h2>My kitties</h2>
      <KittiesWrapper>
        {
          kittyIds.map((id) =>
            <KittyCard
              key={id}
              kittyId={id}
            />)
        }
      </KittiesWrapper>
    </div>
  );
};

export default React.memo(OwnedKittyViewer);
