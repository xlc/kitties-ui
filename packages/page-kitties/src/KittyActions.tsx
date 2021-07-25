// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Button, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

type Props = {
  accountId: string | null;
};

const KittyActions: React.FC<Props> = ({ accountId }: Props) => {
  const { api } = useApi();

  return (
    <section>
      <h1>Kitty Actions</h1>
      <div className='ui--row'>
        <div className='large'>
          <Button.Group>
            <TxButton
              accountId={accountId}
              label='Create New Kitty'
              params={[]}
              tx={api.tx.kitties.create}
            />
          </Button.Group>
        </div>
      </div>
    </section>
  );
};

export default KittyActions;
