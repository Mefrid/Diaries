import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { yup } from '../../utils';
import { NoteDto } from '../../types';
import { useCreateNoteMutation, useEditNoteMutation } from '../../api';
import { useSnackbar } from '../index';

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues: NoteDto;
};

const schema = yup.object().shape({
  title: yup.string().required().max(32),
  text: yup.string().max(256),
});

export const NotePopupForm: FC<Props> = ({ open, onClose, initialValues }) => {
  const [createNote] = useCreateNoteMutation();
  const [editNote] = useEditNoteMutation();

  const { showSnackbar } = useSnackbar();

  const { diaryId, noteId } = useParams<{ diaryId: string; noteId?: string }>();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur={false}
        onSubmit={(values) => {
          onClose();
          noteId
            ? editNote({ ...values, _id: noteId })
                .unwrap()
                .catch(() => {
                  showSnackbar({
                    message: 'Не удалось изменить запись',
                    severity: 'error',
                  });
                })
            : createNote({ ...values, _id: diaryId })
                .unwrap()
                .catch(() => {
                  showSnackbar({
                    message: 'Не удалось создать запись',
                    severity: 'error',
                  });
                });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle style={{ color: 'black' }} id="form-dialog-title">
              {noteId ? 'Редактирование записи' : 'Создание записи'}
            </DialogTitle>
            <DialogContent>
              <Field
                component={TextField}
                autoFocus
                disabled={isSubmitting}
                margin="dense"
                name="title"
                variant="outlined"
                label="Название"
                fullWidth
              />
              <Field
                component={TextField}
                disabled={isSubmitting}
                margin="dense"
                name="text"
                variant="outlined"
                label="Текст"
                multiline
                rows={9}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClose}
                disabled={isSubmitting}
                variant="outlined"
                color="secondary"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                {noteId ? 'Редактировать' : 'Создать'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
