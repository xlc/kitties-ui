
// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { InputAddress } from '@polkadot/react-components';

interface Props {
  className?: string;
  onChange: (accountId: string | null) => void;
}

function AccountSelector ({ className = '', onChange }: Props): React.ReactElement<Props> {
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(
    (): void => onChange(accountId),
    [accountId, onChange]
  );

  return (
    <section className={className}>
      <InputAddress
        className='medium'
        label='my default account'
        onChange={setAccountId}
        type='account'
      />
    </section>
  );
}

export default React.memo(AccountSelector);
