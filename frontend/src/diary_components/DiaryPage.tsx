import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { List, Box } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {
  ControlMenu,
  Page,
  PageTitle,
  BackButton,
  Loading,
  ErrorPage,
  PagePlaceholder,
} from '../common_components';
import { NoteListItem } from '../note_components';
import { Diary } from '../types';
import { useGetNotesByDiaryIdQuery, useGetDiaryQuery } from '../api';

export const DiaryPage: FC = () => {
  const { diaryId } = useParams<{ diaryId: Diary['_id'] }>();

  const {
    data: notes,
    isLoading: notesAreLoading,
    isError: notesError,
  } = useGetNotesByDiaryIdQuery(diaryId);

  const {
    data: diary,
    isLoading: diaryAreLoading,
    isError: diariesError,
  } = useGetDiaryQuery(diaryId);

  if (notesAreLoading || diaryAreLoading) {
    return <Loading />;
  }

  if (notesError || diariesError) {
    return (
      <Page title={<BackButton to={'/'} />}>
        <ErrorPage />
      </Page>
    );
  }

  return (
    <Page
      title={
        <Box display="flex" alignItems="center">
          <BackButton to={'/'} />
          <PageTitle title={diary?.title} diary />
        </Box>
      }
      controls={
        diary === undefined ? (
          <Loading />
        ) : (
          <ControlMenu
            pageType="diary"
            create
            edit
            deletionTitle={diary.title}
            initialValuesForDiary={{ title: diary.title }}
            initialValuesForNote={{ title: '', text: '' }}
          />
        )
      }
    >
      {notes && notes.length > 0 ? (
        <List component="nav">
          {notes.map((note) => (
            <NoteListItem key={note._id} note={note} />
          ))}
        </List>
      ) : (
        <PagePlaceholder
          Icon={CreateIcon}
          title="В этом дневнике нет записей"
          subtitle="Добавить запись можно через панель действий"
        />
      )}
    </Page>
  );
};
