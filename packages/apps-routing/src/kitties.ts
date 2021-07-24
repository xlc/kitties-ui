// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-kitties';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: [
        'tx.kitties.create'
      ]
    },
    group: 'network',
    icon: 'th',
    name: 'Kitties',
    text: t('nav.kitties', 'Kitties', { ns: 'apps-routing' })
  };
}
