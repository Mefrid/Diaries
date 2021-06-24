import { FC } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export const Loading: FC = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress color="primary" />
  </Box>
);
