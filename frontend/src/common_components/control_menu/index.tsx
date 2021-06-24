import { FC, useState } from 'react';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  MenuItemProps,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DeletePopup } from './DeletePopup';
import { Diary, DiaryDto, Note, NoteDto } from '../../types';
import { DiaryPopupForm } from './DiaryPopupForm';
import { NotePopupForm } from './NotePopupForm';

const CustomMenuItem: FC<{
  children: string;
  onClick: MenuItemProps['onClick'];
}> = ({ children, onClick }) => (
  <MenuItem onClick={onClick} style={{ color: 'black' }}>
    {children}
  </MenuItem>
);

type Props = {
  pageType: 'home' | 'diary' | 'note';
  initialValuesForDiary?: DiaryDto;
  initialValuesForNote?: NoteDto;
  create?: boolean;
  deletionTitle?: Diary['title'] | Note['title'];
  edit?: boolean;
};

export const ControlMenu: FC<Props> = ({
  pageType,
  create,
  deletionTitle,
  edit,
  initialValuesForDiary,
  initialValuesForNote,
}) => {
  const [diaryPopupIsOpen, setDiaryPopupIsOpen] = useState<boolean>(false);
  const [notePopupIsOpen, setNotePopupIsOpen] = useState<boolean>(false);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const onCreateClick = () => {
    closeMenu();
    if (pageType === 'home') {
      setDiaryPopupIsOpen(true);
    } else if (pageType === 'diary') {
      setNotePopupIsOpen(true);
    }
  };

  const onEditClick = () => {
    closeMenu();
    if (pageType === 'diary') {
      setDiaryPopupIsOpen(true);
    } else if (pageType === 'note') {
      setNotePopupIsOpen(true);
    }
  };

  const onDeleteClick = () => {
    closeMenu();
    setDeletePopupIsOpen(true);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Действия">
        <IconButton
          style={{ color: '#FFFFFF' }}
          aria-controls="actions-menu"
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {create && (
          <CustomMenuItem onClick={onCreateClick}>Создать</CustomMenuItem>
        )}
        {edit && (
          <CustomMenuItem onClick={onEditClick}>Изменить</CustomMenuItem>
        )}
        {deletionTitle && (
          <CustomMenuItem onClick={onDeleteClick}>Удалить</CustomMenuItem>
        )}
      </Menu>
      {initialValuesForDiary && (
        <DiaryPopupForm
          open={diaryPopupIsOpen}
          onClose={() => setDiaryPopupIsOpen(false)}
          initialValues={initialValuesForDiary}
        />
      )}
      {initialValuesForNote && (
        <NotePopupForm
          open={notePopupIsOpen}
          onClose={() => setNotePopupIsOpen(false)}
          initialValues={initialValuesForNote}
        />
      )}
      {deletionTitle && (
        <DeletePopup
          deletionTitle={deletionTitle}
          open={deletePopupIsOpen}
          onClose={() => setDeletePopupIsOpen(false)}
        />
      )}
    </>
  );
};
