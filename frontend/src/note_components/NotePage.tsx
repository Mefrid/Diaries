import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import {
  ControlMenu,
  Page,
  BackButton,
  Loading,
  ErrorPage,
} from '../common_components';
import { Diary, Note } from '../types';
import { useGetNoteQuery } from '../api';

export const NotePage: FC = () => {
  const { diaryId, noteId } =
    useParams<{ diaryId: Diary['_id']; noteId: Note['_id'] }>();

  const { data: note, isLoading, isError } = useGetNoteQuery(noteId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Page title={<BackButton to={'/'} />}>
        <ErrorPage />
      </Page>
    );
  }

  return (
    <Page
      title={<BackButton to={`/${diaryId}`} />}
      controls={
        note === undefined ? (
          <Loading />
        ) : (
          <ControlMenu
            pageType="note"
            edit
            deletionTitle={note.title}
            initialValuesForNote={{
              title: note.title,
              text: note.text,
            }}
          />
        )
      }
    >
      <Box p={3} display="flex" flexDirection="column">
        <Typography variant="h5" gutterBottom align="center">
          {note?.title}
        </Typography>
        <Typography style={{ whiteSpace: 'pre-line' }}>{note?.text}</Typography>
      </Box>
    </Page>
  );
};
