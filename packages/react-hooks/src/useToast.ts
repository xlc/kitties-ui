import { useContext } from 'react';
import {ToastContext} from '@polkadot/react-components/Toast/Context';

export default function useToast (): {show: (message: string) => void} {
  return useContext(ToastContext);
}
