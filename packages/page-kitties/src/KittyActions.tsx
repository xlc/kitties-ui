// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useState } from 'react';

import { Button, InputAddress, InputBalance, InputNumber, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

type Props = {
  accountId: string | null;
};

const KittyActions: React.FC<Props> = ({ accountId }: Props) => {
  const { api } = useApi();
  const [parent1, setParent1] = useState<BN | undefined>(undefined);
  const [parent2, setParent2] = useState<BN | undefined>(undefined);
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [transferKittyId, setTransferKittyId] = useState<BN | undefined>(undefined);
  const [sellKittyId, setSellKittyId] = useState<BN | undefined>(undefined);
  const [sellKittyPrice, setSellKittyPrice] = useState<BN | undefined>(undefined);

  return (
    <section>
      <h1>Kitty Actions</h1>
      <h2>Create Kitty</h2>
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
      <h2>Breed Kitty</h2>
      <div className='ui--row'>
        <div className='large'>
          <InputNumber
            label='First Parent Kitty ID'
            onChange={setParent1}
          />
          <InputNumber
            label='Second Parent Kitty ID'
            onChange={setParent2}
          />
          <Button.Group>
            <TxButton
              accountId={accountId}
              label='Breed Kitty'
              params={[parent1, parent2]}
              tx={api.tx.kitties.breed}
            />
          </Button.Group>
        </div>
      </div>
      <h2>Transfer Kitty</h2>
      <div className='ui--row'>
        <div className='large'>
          <InputAddress
            label='recipient address'
            onChange={setRecipientId}
          />
          <InputNumber
            label='Kitty ID to send'
            onChange={setTransferKittyId}
          />
          <Button.Group>
            <TxButton
              accountId={accountId}
              label='Transfer Kitty'
              params={[recipientId, transferKittyId]}
              tx={api.tx.kitties.transfer}
            />
          </Button.Group>
        </div>
      </div>
      <h2>Sell Kitty</h2>
      <div className='ui--row'>
        <div className='large'>
          <InputNumber
            label='Kitty ID to sell'
            onChange={setSellKittyId}
          />
          <InputBalance
            label='Kitty Price to sell'
            onChange={setSellKittyPrice}
          />
          <Button.Group>
            <TxButton
              accountId={accountId}
              label='Set Kitty Price'
              params={[sellKittyId, sellKittyPrice]}
              tx={api.tx.kitties.setPrice}
            />
          </Button.Group>
        </div>
      </div>
    </section>
  );
};

export default KittyActions;
