import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  boxDB: {
    border: '2px solid #c9c9c9',
    width: '80%',
    height: '400px',
    position: "relative",
    textAlign: "center"
  },
  trendBox: {
    width: '80%',
    height: '400px',
    [theme.breakpoints.down(1200)]: {
      width: '90%'
    }
  },
  storeBox: {
    width: '80%',
    height: '400px',
    [theme.breakpoints.down(1200)]: {
      width: '90%'
    }
  },
  groupBox: {
    width: '95%',
    height: '380px',
    [theme.breakpoints.down(1650)]: {
      width: '90%'
    }
  },
  classBox: {
    width: '95%',
    height: '380px',
    [theme.breakpoints.down(1650)]: {
      width: '80%'
    },
    [theme.breakpoints.down(1200)]: {
      width: '90%'
    }
  },
  brandBox: {
    width: '95%',
    height: '380px',
    [theme.breakpoints.down(1650)]: {
      width: '80%'
    },
    [theme.breakpoints.down(1200)]: {
      width: '90%'
    }
  },
  trendGrid: {
    marginBottom: '30px',
    [theme.breakpoints.up(1200)]: {
      maxWidth: '50% !important',
      flexBasis: '50% !important'
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  storeGrid: {
    marginBottom: '30px',
    [theme.breakpoints.up(1200)]: {
      maxWidth: '50% !important',
      flexBasis: '50% !important'
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  groupGrid: {
    [theme.breakpoints.up(1650)]: {
      maxWidth: '41.66% !important',
      flexBasis: '41.66% !important'
    },
    [theme.breakpoints.down(1650)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      marginBottom: '30px',
    }
  },
  classGrid: {
    [theme.breakpoints.up(1650)]: {
      maxWidth: '29.166% !important',
      flexBasis: '29.166% !important'
    },
    [theme.breakpoints.down(1650)]: {
      maxWidth: '50% !important',
      flexBasis: '50% !important',
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      marginBottom: '30px',
    }
  },
  brandGrid: {
    [theme.breakpoints.up(1650)]: {
      maxWidth: '29.166% !important',
      flexBasis: '29.166% !important'
    },
    [theme.breakpoints.down(1650)]: {
      maxWidth: '50% !important',
      flexBasis: '50% !important'
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  resetB: {
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
