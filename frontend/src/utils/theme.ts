import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#388E3C',
      main: '#4CAF50',
      light: '#C8E6C9',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
});
