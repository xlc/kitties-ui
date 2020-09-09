// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { ButtonProps } from './Button/types';
import Button from './Button';
import styled from 'styled-components';

const EllipsisButton = ({ onClick, className }: ButtonProps) => (
  <Button
    icon='ellipsis-v'
    className={className}
    onClick={onClick}
  />
);

export default React.memo(styled(EllipsisButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 2.85rem;
  width: 2.85rem;
  margin-left: 0.55rem;
  border: 1px solid #DFDFDF;
  border-radius: 0.28rem;
`);
