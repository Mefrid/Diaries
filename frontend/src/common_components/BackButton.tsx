import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type Props = {
  to: LinkProps['to'];
};

export const BackButton: FC<Props> = ({ to }) => {
  return (
    <IconButton
      component={Link}
      to={to}
      style={{ color: 'white', marginLeft: -12 }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};
