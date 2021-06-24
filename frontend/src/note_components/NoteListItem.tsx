import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { Note as INote } from '../types';
import { transformTimeToInterface } from '../utils';

type Props = {
  note: INote;
};

export const NoteListItem: FC<Props> = ({ note }) => {
  const { url } = useRouteMatch();
  return (
    <ListItem button component={Link} to={`${url}/${note._id}`}>
      <ListItemText
        primary={note.title}
        secondary={transformTimeToInterface(note.createdAt)}
      />
    </ListItem>
  );
};
