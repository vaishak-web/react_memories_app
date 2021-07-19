import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  paginationMobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appContainer: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  },
}));