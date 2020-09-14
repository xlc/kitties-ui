// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';

import Body from './Body';
import Foot from './Foot';
import Head from './Head';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  empty?: React.ReactNode | false;
  emptySpinner?: React.ReactNode;
  filter?: React.ReactNode;
  footer?: React.ReactNode;
  header?: [React.ReactNode?, string?, number?, (() => void)?][];
  isFixed?: boolean;
  isRowsSeparated?: boolean;
}

function extractKids (children: React.ReactNode): [boolean, React.ReactNode] {
  if (!Array.isArray(children)) {
    return [!children, children];
  }

  const kids = children.filter((child) => !!child);
  const isEmpty = kids.length === 0;

  return [isEmpty, isEmpty ? null : kids];
}

function Table ({ children, className = '', empty, emptySpinner, filter, footer, header, isFixed, isRowsSeparated }: TableProps): React.ReactElement<TableProps> {
  const [isEmpty, kids] = extractKids(children);

  return (
    <div className={`ui--Table ${className}`}>
      <table className={`${(isFixed && !isEmpty) ? 'isFixed' : 'isNotFixed'} ${isRowsSeparated ? 'isRowsSeparated' : ''} highlight--bg-faint`}>
        <Head
          filter={filter}
          header={header}
          isEmpty={isEmpty}
        />
        <Body
          empty={empty}
          emptySpinner={emptySpinner}
        >
          {kids}
        </Body>
        <Foot
          footer={footer}
          isEmpty={isEmpty}
        />
      </table>
    </div>
  );
}

export default React.memo(styled(Table)`
  margin-bottom: 1.5rem;
  max-width: 100%;
  width: 100%;

  table {
    border-spacing: 0;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 1;

    &.isFixed {
      table-layout: fixed;
    }

    &.isRowsSeparated {
      border-collapse: separate;
      border-spacing: 0 0.57rem;

      td {
        border-top: 1px solid #DFDFDF;
        border-bottom: 1px solid #DFDFDF;

        &:first-child {
          border-left: 1px solid #DFDFDF;
          border-top-left-radius: 0.28rem;
          border-bottom-left-radius: 0.28rem;
        }

        &:last-child {
          border-right: 1px solid #DFDFDF;
          border-top-right-radius: 0.28rem;
          border-bottom-right-radius: 0.28rem;
        }
      }
    }

    tr {
      max-width: 100%;
      width: 100%;

      td,
      &:not(.filter) th {
        &:first-child {
          padding-left: 1.15rem;
        }

        &:last-child {
          padding-right: 1.15rem;
        }

        &.all {
          width: 100%;

          summary {
            white-space: normal;
          }
        }
      }
    }
  }
`);
