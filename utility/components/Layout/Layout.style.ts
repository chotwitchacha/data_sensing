import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    overflowY:'auto',
    height: '100vh'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down(940)]: {
      marginLeft: -drawerWidth
    },
  },
  appBarMain: {
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  textMain: {
    flexGrow: 1,
    fontWeight: 'bolder',
    fontSize: '24px',
    marginTop: '15px',
    marginLeft: '5px',
    color: '#5D40D2'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up(1020)]: {
      display: 'flex',
    },
  },
  normalText: {
    color: '#5E6C84',
    marginLeft: '10px'
  },
  tab: {
    flexGrow: 1,
  },
  divUser: {
    cursor: 'default',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRightColor: '#949494',
    borderLeftColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderBottomColor: '#ffffff',
    padding: '5px',
    fontWeight: 400,
    maxWidth: '400px',
  },
  username: {
    fontSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  applyB: {
    backgroundColor: "#5D40D2",
    color: '#ffffff',
    boxShadow: 'none',
    border: '1px solid #5D40D2',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: "#5D40D2"
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
  },
  applyBDis: {
    backgroundColor: "#5D40D2",
    color: '#ffffff',
    boxShadow: 'none',
  },
  resetBDis: {
    backgroundColor: "#FFFFFF",
    color: '#6D6D6D',
    marginLeft: '15px',
    boxShadow: 'none',
    border: '1px solid #DBDBDB'
  },
  AccordionStyle: {
    border: '1px solid #e0e0e0',
    borderRight: '0px',
    borderLeft: '0px',
    margin: '0px !important',
    boxShadow: 'none',
  },
  mobileCover: {
    display: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position:'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    [theme.breakpoints.down(940)]: {
      display: 'flex'
    },
  }
}))
