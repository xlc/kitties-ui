// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import {Icon} from '@polkadot/react-components';

interface CopyButtonProps {
  elementId: string;
  className?: string;
}

function copy(id: string) {
  const content = document.getElementById(id);
  if (content instanceof HTMLInputElement) {
    content.select();
    document.execCommand('copy');
  } else {
    throw Error(`Element (#${id}) does not exist`);
  }
}

const CopyToClipboard = ({elementId, className}: CopyButtonProps) => (
  <button className={className} onClick={() => copy(elementId)}>
    <Icon icon="copy"/>
    Copy to clipboard
  </button>
);

export default React.memo(CopyToClipboard);
