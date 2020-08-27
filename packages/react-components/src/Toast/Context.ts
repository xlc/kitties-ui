import React from 'react';

const noop = (): void => undefined;

export const ToastContext = React.createContext<({show: (message: string) => void})>({ show: noop });
