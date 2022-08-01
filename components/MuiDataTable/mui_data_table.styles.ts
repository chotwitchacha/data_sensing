import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  dataTable: props =>({
    minWidth: '100%',
    width: '100%',
    borderRadius: '15px',
  }),
  showIcon: {
    margin:'0px 20px 0px 20px'
  },
  stickyCheckbox:{
    position: 'sticky',
    zIndex: 150,
    left: '0',
    backgroundColor: 'inherit',
  },
  cellContent: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
    fontWeight: 400,
    maxWidth: '400px'
  },
  tableRowOdd:{
    backgroundColor: 'white',
    "&:hover": {
      backgroundColor: '#fff8ef'
    }
  },
  tableRowEven:{
    backgroundColor: '#f8f9f9',
    "&:hover": {
      backgroundColor: '#fff8ef'
    }
  },
  filterChip:{
    overflow: 'hidden',
    margin: theme.spacing(1),
    color: theme.palette.warning.main
  },
  textColumn: {
    color: theme.palette.warning.main,
    margin: theme.spacing(1)
  },
  subLabel:{
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '12px',
    fontWeight: 400,
    color: '#344563'
  },
  ellipsisText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace:'nowrap'
  }

}));

export default styles