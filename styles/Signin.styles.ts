import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  main_box: {
    width: '100vw',
    height: '100vh',
    background: '#dcdcdc'
  },

  grid_item: {
    height: '100vh'
  },
  paper: {
    height: '100vh',
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft: '7vh',
    paddingRight: '7vh',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  item_box: {
    width: 'auto',
    height: 'auto',
    minHeight: '50px',
    display: 'flex',
    color: theme.palette.info.main,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  login_box: {
    width: 'auto',
    height: 'auto',
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '7vh'
  },
  login_button: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '35px',
    paddingRight: '35px',
    color: '#fff',
    textTransform: 'none',
    "&:hover": {
      backgroundColor: '#5D40D2'
    }
  },
  fullForm: {
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1),
  },
  headline_typo: {
    textAlign: 'center'
  },
  icon_inline: {
    verticalAlign: 'bottom'
  },
  sub_headline_typo: {
    fontWeight: 'bold',
    paddingTop: '15px',
    paddingBottom: '10px',
  }
}));

export default styles