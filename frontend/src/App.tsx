import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { List } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import { useGetDiariesQuery } from './api';
import {
  ControlMenu,
  Page,
  PageTitle,
  Loading,
  ErrorPage,
  PagePlaceholder,
} from './common_components';
import { DiaryPage, DiaryListItem } from './diary_components';
import { NotePage } from './note_components';

export const App: FC = () => {
  const { data: diaries, isLoading, isError } = useGetDiariesQuery();
  const { path } = useRouteMatch();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Page>
        <ErrorPage message="Произошла ошибка. Попробуйте перезагрузить страницу." />
      </Page>
    );
  }

  return (
    <Switch>
      <Route exact path="/" key="homepage">
        <Page
          title={<PageTitle title="Дневники" />}
          controls={
            <ControlMenu
              pageType="home"
              create
              initialValuesForDiary={{ title: '' }}
            />
          }
        >
          {diaries !== undefined && diaries.length > 0 ? (
            <List component="nav">
              {diaries.map((diary) => (
                <DiaryListItem key={diary._id} diary={diary} />
              ))}
            </List>
          ) : (
            <PagePlaceholder
              Icon={BookIcon}
              title="Пока что дневников нет"
              subtitle="Создать дневник можно через панель действий"
            />
          )}
        </Page>
      </Route>
      <Route exact path={`${path}:diaryId`} key="diaryRoute">
        <DiaryPage />
      </Route>
      <Route exact path={`${path}:diaryId/:noteId`} key="noteRoute">
        <NotePage />
      </Route>
    </Switch>
  );
};
