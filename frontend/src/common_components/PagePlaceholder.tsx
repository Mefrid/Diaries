import { FC } from 'react';
import { Box, Typography, SvgIcon } from '@material-ui/core';

type Props = {
  Icon: typeof SvgIcon;
  title: string;
  subtitle: string;
};

export const PagePlaceholder: FC<Props> = ({ Icon, title, subtitle }) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
  >
    <Icon style={{ fontSize: 80 }} />
    <Box
      mt={1}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Typography align="center" variant="h6">
        {title}
      </Typography>
      <Typography align="center" variant="body2">
        {subtitle}
      </Typography>
    </Box>
  </Box>
);
