// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.


import React from 'react';
import Button from './Button';
import { ButtonProps } from './Button/types';
import styled from 'styled-components';

const SendButton = ({ onClick, label, className }: ButtonProps) => (
  <Button
    icon='paper-plane'
    isBasic
    className={className}
    label={label}
    onClick={onClick}
  />
);

export default React.memo(styled(SendButton)`
  display: inline-flex;
  align-items: center;
  height: 2.85rem;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  border: 1px solid #DFDFDF;
  border-radius: 0.28rem;
  text-transform: capitalize;

  svg {
    padding: 0;
  }
`);
