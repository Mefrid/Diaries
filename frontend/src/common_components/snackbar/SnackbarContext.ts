import { createContext, useContext } from 'react';
import { SnackbarOptions } from './SnackbarProvider';

type ContextType = {
  showSnackbar: (options: SnackbarOptions) => Promise<void>;
};

export const SnackbarContext = createContext<ContextType>({} as ContextType);

export const useSnackbar = () => useContext(SnackbarContext);
