import { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { useDeleteDiaryMutation, useDeleteNoteMutation } from '../../api';
import { Diary, Note } from '../../types';
import { useSnackbar } from '../index';

type Props = {
  deletionTitle: Diary['title'] | Note['title'];
  open: boolean;
  onClose: () => void;
};

export const DeletePopup: FC<Props> = ({ open, deletionTitle, onClose }) => {
  const history = useHistory();

  const [deleteDiary] = useDeleteDiaryMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const { showSnackbar } = useSnackbar();

  const { diaryId, noteId } =
    useParams<{ diaryId: string; noteId: string | undefined }>();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {noteId === undefined
            ? `Вы уверенны, что хотите удалить дневник "${deletionTitle}?"`
            : `Вы уверенны, что хотите удалить запись "${deletionTitle}?"`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Отмена
        </Button>
        <Button
          type="submit"
          onClick={() => {
            onClose();
            if (noteId === undefined) {
              deleteDiary(diaryId)
                .unwrap()
                .then(() => history.push('/'))
                .catch(() =>
                  showSnackbar({
                    message: `Не удалось удалить дневник "${deletionTitle}"`,
                    severity: 'error',
                  }),
                );
            } else {
              deleteNote(noteId)
                .unwrap()
                .then(() => history.push(`/${diaryId}`))
                .catch(() =>
                  showSnackbar({
                    message: `Не удалось удалить запись "${deletionTitle}"`,
                    severity: 'error',
                  }),
                );
            }
          }}
          variant="contained"
          color="primary"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
