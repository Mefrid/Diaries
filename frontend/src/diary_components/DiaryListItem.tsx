import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { Diary as IDiary } from '../types';
import { transformTimeToInterface } from '../utils';

type Props = {
  diary: IDiary;
};

export const DiaryListItem: FC<Props> = ({ diary }) => (
  <ListItem button component={Link} to={diary._id}>
    <ListItemText
      primary={diary.title}
      secondary={transformTimeToInterface(diary.createdAt)}
    />
  </ListItem>
);
