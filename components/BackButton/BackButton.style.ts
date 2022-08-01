import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300

export const useStyles = makeStyles((theme) => ({
  backToReports: {
    margin: '20px 0px 0px 15px',
    fontWeight: 'bold',
    color: '#757575',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      color: '#5D40D2'
    }
  }
}))
