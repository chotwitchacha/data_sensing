import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    resetA: {
        backgroundColor: "#FFFFFF",
        color: '#6D6D6D',
        marginLeft: '15px',
        boxShadow: 'none',
        border: '1px solid #DBDBDB',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: "#FFFFFF"
        }
      }
 
}))
