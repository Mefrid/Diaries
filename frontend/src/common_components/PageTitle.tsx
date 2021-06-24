import { FC } from 'react';
import { Typography } from '@material-ui/core';

export type Props = {
  title?: string;
  diary?: boolean;
};

export const PageTitle: FC<Props> = ({ title, diary }) => (
  <Typography
    variant="h6"
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'white',
    }}
  >
    {diary ? `"${title}"` : title}
  </Typography>
);
