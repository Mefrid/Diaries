import { FC } from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { PagePlaceholder } from './PagePlaceholder';

type Props = {
  message?: string;
};

export const ErrorPage: FC<Props> = ({
  message = 'Произошла ошибка. Попробуйте перезагрузить страницу или вернитесь на главную страницу.',
}) => (
  <PagePlaceholder
    Icon={SentimentVeryDissatisfiedIcon}
    title="Ууупс"
    subtitle={message}
  />
);
