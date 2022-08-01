import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  boxDB: {
    // border: '1px solid #c9c9c9',
    width: '80%',
    height: '400px',
    position: "relative",
    textAlign: "center",
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    // rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px
    // boxShadow: '0 23px 20px -20px rgba(115,162,208,0.1),0 0 15px rgba(115,162,208,0.06)',
    borderRadius: '25px'
  },
  trendBox: {
    width: '95%',
    height: '450px',
    backgroundColor: '#ffffff',
  },
  infoGrid: {
    height: '300px',
    marginBottom: '30px',
    paddingLeft: '15px',
    [theme.breakpoints.up(1500)]: {
      maxWidth: '40% !important',
      flexBasis: '40% !important'
    },
    [theme.breakpoints.down(1500)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      paddingLeft: '0'
    }
  },
  infoBox: {
    display: "flex",
    justifyContent: "left",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down(1500)]: {
      justifyContent: "center",
    }
  },
  infoGridLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  infoGridRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '25%',
    wordBreak: 'break-word'
  },
  detailGrid: {
    height: '300px',
    marginBottom: '30px',
    paddingRight: '15px',
    [theme.breakpoints.up(1500)]: {
      maxWidth: '60% !important',
      flexBasis: '60% !important'
    },
    [theme.breakpoints.down(1500)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      paddingRight: '0'
    },
    [theme.breakpoints.down(520)]: {
      height: '100%',
    }
  },
  detailBox: {
    display: "flex",
    justifyContent: "right",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down(1500)]: {
      justifyContent: "center",
    }
  },
  tableGrid: {
    [theme.breakpoints.up(1200)]: {
      maxWidth: '40% !important',
      flexBasis: '40% !important'
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
    }
  },
  trendGrid: {
    [theme.breakpoints.up(1200)]: {
      maxWidth: '60% !important',
      flexBasis: '60% !important'
    },
    [theme.breakpoints.down(1200)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  trendInsideBox: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingLeft: '15px',
    [theme.breakpoints.down(1200)]: {
      paddingLeft: '0px',
      justifyContent: "center"
    }
  },
  topBox: {
    color: '#333333',
    height: '95%',
    width: '95%',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    borderRadius: '25px',
  },
  infoGridInsideLeft: {
    [theme.breakpoints.up(520)]: {
      maxWidth: '40% !important',
      flexBasis: '40% !important'
    },
    [theme.breakpoints.down(520)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  infoGridInsideRight: {
    [theme.breakpoints.up(520)]: {
      maxWidth: '60% !important',
      flexBasis: '60% !important'
    },
    [theme.breakpoints.down(520)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      padding: '15px 15px 50px 50px'
    }
  },
  detailLeftGrid: {
    padding: '30px',
    background: 'linear-gradient(180.19deg, rgba(136, 132, 216, 0.15) 3.01%, rgba(136, 132, 216, 0) 96.99%)',
    borderRadius: '25px 0px 0px 25px',
    [theme.breakpoints.up(520)]: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important'
    },
    [theme.breakpoints.down(520)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      borderRadius: '25px 25px 0px 0px',
    }
  },
  detailCenterGrid: {
    padding: '30px',
    background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.15) 0%, rgba(25, 118, 210, 0) 100%)',
    borderRadius: '0px',
    [theme.breakpoints.up(520)]: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important'
    },
    [theme.breakpoints.down(520)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  detailRightGrid: {
    padding: '30px',
    background: 'linear-gradient(180deg, rgba(210, 25, 169, 0.15) 0%, rgba(210, 25, 25, 0) 100%)',
    borderRadius: '0px 25px 25px 0px',
    [theme.breakpoints.up(520)]: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important'
    },
    [theme.breakpoints.down(520)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      borderRadius: '0px 0px 25px 25px',
    }
  },
  tableLogoGrid: {
    maxWidth: '40% !important',
    flexBasis: '40% !important'
  },
  tableDetailGrid: {
    maxWidth: '60% !important',
    flexBasis: '60% !important'
  },
  expected: {
    fontSize: '20px',
    textAlign: 'center',
    [theme.breakpoints.down(1690)]: {
      fontSize: '18px'
    },
    [theme.breakpoints.down(1590)]: {
      fontSize: '16px'
    },
    [theme.breakpoints.down(1500)]: {
      fontSize: '20px'
    },
    [theme.breakpoints.down(1145)]: {
      fontSize: '18px'
    },
    [theme.breakpoints.down(1085)]: {
      fontSize: '16px'
    },
    [theme.breakpoints.down(940)]: {
      fontSize: '18px'
    },
    [theme.breakpoints.down(785)]: {
      fontSize: '16px'
    },
    [theme.breakpoints.down(520)]: {
      fontSize: '20px'
    },
    [theme.breakpoints.down(410)]: {
      fontSize: '18px'
    },
    [theme.breakpoints.down(385)]: {
      fontSize: '16px'
    }
  },
  EOS: {
    backgroundColor: '#ffffff',
    width: '95%',
    height: '31%',
    [theme.breakpoints.down(1200)]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: '15px auto 0 auto',
      height: '50%'
    }
  },
  LT: {
    backgroundColor: '#ffffff',
    width: '95%',
    height: '31%',
    marginTop: '15px',
    [theme.breakpoints.down(1200)]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: '15px auto 0 auto',
      height: '50%'
    }
  },
  ERD: {
    backgroundColor: '#ffffff',
    width: '95%',
    height: '31%',
    marginTop: '15px',
    [theme.breakpoints.down(1200)]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: '15px auto 0 auto',
      height: '50%'
    }
  },
  BottomBox: {
    [theme.breakpoints.down(1200)]: {
      height: '30px'
    }
  }
}))
