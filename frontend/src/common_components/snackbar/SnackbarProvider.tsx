import { FC, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import { SnackbarContext } from './SnackbarContext';

export type SnackbarOptions = {
  message: string;
  severity?: AlertProps['severity'];
  duration?: number;
};

const defaultSnackbarOptions: SnackbarOptions = {
  message: '',
  severity: 'success',
  duration: 4000,
};

export const SnackbarProvider: FC = ({ children }) => {
  const [snackbarIsVisible, setSnackbarIsVisible] = useState<boolean>(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>(
    defaultSnackbarOptions,
  );

  const showSnackbar = (options: SnackbarOptions): Promise<void> => {
    setSnackbarOptions({ ...defaultSnackbarOptions, ...options });
    setSnackbarIsVisible(true);
    return new Promise<void>((resolve) => {
      setTimeout(
        () => resolve(),
        options.duration || defaultSnackbarOptions.duration,
      );
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarIsVisible}
        autoHideDuration={snackbarOptions.duration}
        onClose={() => setSnackbarIsVisible(false)}
      >
        <Alert
          onClose={() => setSnackbarIsVisible(false)}
          severity={snackbarOptions.severity}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
