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
import { DiaryDto } from '../../types';
import { useCreateDiaryMutation, useEditDiaryMutation } from '../../api';
import { useSnackbar } from '../index';

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues: DiaryDto;
};

const schema = yup.object().shape({
  title: yup.string().required().max(32),
});

export const DiaryPopupForm: FC<Props> = ({ open, onClose, initialValues }) => {
  const [createDiary] = useCreateDiaryMutation();
  const [editDiary] = useEditDiaryMutation();

  const { showSnackbar } = useSnackbar();

  const { diaryId } = useParams<{ diaryId: string | undefined }>();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur={false}
        onSubmit={(values) => {
          onClose();
          diaryId
            ? editDiary({ ...values, _id: diaryId })
                .unwrap()
                .catch(() => {
                  showSnackbar({
                    message: 'Не удалось изменить дневник',
                    severity: 'error',
                  });
                })
            : createDiary(values)
                .unwrap()
                .catch(() => {
                  showSnackbar({
                    message: 'Не удалось создать дневник',
                    severity: 'error',
                  });
                });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle style={{ color: 'black' }} id="form-dialog-title">
              {diaryId ? 'Редактирование дневника' : 'Создание дневника'}
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
                {diaryId ? 'Редактировать' : 'Создать'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
