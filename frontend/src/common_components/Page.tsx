import { FC } from 'react';
import { Box, Paper, useTheme } from '@material-ui/core';

type Props = {
  title?: JSX.Element;
  controls?: JSX.Element;
  children: JSX.Element;
};

export const Page: FC<Props> = ({ title, controls, children }) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      bgcolor="#FFFFFF"
    >
      <Paper
        elevation={3}
        square
        style={{
          backgroundColor: theme.palette.primary.dark,
          position: 'sticky',
          top: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Box display="flex" alignItems="center" p={2}>
          {title || controls ? (
            <>
              <Box flexGrow={1} overflow="hidden">
                {title}
              </Box>
              {controls}
            </>
          ) : (
            <Box flexGrow={1} height={48}></Box>
          )}
        </Box>
      </Paper>
      <Box py={1} width="100%" flexGrow={1}>
        {children}
      </Box>
    </Box>
  );
};
