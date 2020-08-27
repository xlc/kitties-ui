import React from 'react';

import Labelled from './LabelledNew';
import TextAreaWithDropdown from '@polkadot/react-components/TextAriaWithDropdown';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  className?: string;
  seed?: string;
  help?: React.ReactNode;
  isFull?: boolean;
  label?: React.ReactNode;
  labelExtra?: React.ReactNode;
  withLabel?: boolean;
  withEllipsis?: boolean;
}

// // Find decimal separator used in current locale
// const getDecimalSeparator = (): string => 1.1
//   .toLocaleString()
//   .replace(/\d/g, '');

// note: KeyboardEvent.keyCode and KeyboardEvent.which are deprecated
const KEYS = {
  A: 'a',
  ALT: 'Alt',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  C: 'c',
  CMD: 'Meta',
  CTRL: 'Control',
  // DECIMAL: getDecimalSeparator(),
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  V: 'v',
  X: 'x',
  ZERO: '0'
};

const KEYS_PRE: any[] = [KEYS.ALT, KEYS.CMD, KEYS.CTRL];

// reference: degrade key to keyCode for cross-browser compatibility https://www.w3schools.com/jsref/event_key_keycode.asp
const isCopy = (key: string, isPreKeyDown: boolean): boolean =>
  isPreKeyDown && key === KEYS.C;

const isCut = (key: string, isPreKeyDown: boolean): boolean =>
  isPreKeyDown && key === KEYS.X;

const isPaste = (key: string, isPreKeyDown: boolean): boolean =>
  isPreKeyDown && key === KEYS.V;

const isSelectAll = (key: string, isPreKeyDown: boolean): boolean =>
  isPreKeyDown && key === KEYS.A;

function TextAriaWithLabel ({children, seed, className, help, isFull = false, label, labelExtra, withEllipsis, withLabel }: Props): React.ReactElement<Props> {
  return (
    <Labelled
      className={className}
      help={help}
      isFull={isFull}
      label={label}
      labelExtra={labelExtra}
      withEllipsis={withEllipsis}
      withLabel={withLabel}
      isOuter
      isSmall
    >
      <div className='TextAreaWithDropdown'>
        <TextAreaWithDropdown
          isReadOnly
          value={seed}
          id="printJS-seed"
        >
          {children}
        </TextAreaWithDropdown>
      </div>
    </Labelled>
  );
}

export default styled(React.memo(TextAriaWithLabel))`
  .TextAreaWithDropdown {
    display: flex;
  }
  `;

export {
  isCopy,
  isCut,
  isPaste,
  isSelectAll,
  KEYS,
  KEYS_PRE
};
