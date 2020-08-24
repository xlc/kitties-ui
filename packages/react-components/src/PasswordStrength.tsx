// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';
import owasp from 'owasp-password-strength-test'

interface Props {
  className?: string;
  value: string;
}

function calcStrength (password: string): number {
  owasp.config({
    allowPassphrases       : true,
    maxLength              : 128,
    minLength              : 8,
    minPhraseLength        : 20
  });
  const passedTests = owasp.test(password).passedTests.length;
  console.log(owasp.test(password))
  return owasp.test(password).isPassphrase ? 6 : passedTests - 2 ;
}

function PasswordStrength ({ className = '', value }: Props): React.ReactElement<Props> {
  // No need for memo, component is already memo-ed (only changes on value)
  const style = { width: `${calcStrength(value) * 100/6}%` };

  return (
    <div className={className}>
      <div
        className='ui--highlight--bg'
        style={style}
      />
    </div>
  );
}

export default React.memo(styled(PasswordStrength)`
  background: ##eee6e6;
  border-radius: 0.25rem;
  margin-left: 2rem;
  margin-top: 0.25rem;
  overflow: hidden;

  > div {
    height: 0.5rem;
  }
`);
