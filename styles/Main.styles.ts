import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  Main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundImage: 'url("./main/bg-main.png")',
    backgroundPosition: 'bottom right',
    [theme.breakpoints.down(1150)]: {
      overflow: 'auto'
    }
  },
  gridMainLeft: {
    [theme.breakpoints.up(1150)]: {
      maxWidth: '66.66% !important',
      flexBasis: '66.66% !important'
    },
    [theme.breakpoints.down(1150)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  gridMainLeftTop: {
    maxWidth: '100% !important',
    flexBasis: '100% !important',
    [theme.breakpoints.up(1150)]: {
      height: '65vh',
    },
    [theme.breakpoints.down(1010)]: {
      height: '50vh',
    }
  },
  gridMainLeftTopBox: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "80px",
    [theme.breakpoints.down(1150)]: {
      justifyContent: "center",
      textAlign: 'center'
    }
  },
  gridMainLeftTopTextMain: {
    fontSize: '70px',
    fontWeight: 'bolder',
    color: '#ffffff',
    marginBottom: '10%',
    [theme.breakpoints.down(1150)]: {
      marginBottom: '8%'
    },
    [theme.breakpoints.down(500)]: {
      fontSize: '60px'
    },
    [theme.breakpoints.down(430)]: {
      fontSize: '50px'
    },
    [theme.breakpoints.down(360)]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down(290)]: {
      fontSize: '30px'
    },
    [theme.breakpoints.down(210)]: {
      fontSize: '20px'
    }
  },
  gridMainLeftTopTextEnd: {
    fontSize: '50px',
    fontWeight: 'bolder',
    color: '#ffffff',
    [theme.breakpoints.down(500)]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down(430)]: {
      fontSize: '30px'
    },
    [theme.breakpoints.down(360)]: {
      fontSize: '25px'
    },
    [theme.breakpoints.down(290)]: {
      fontSize: '20px'
    },
    [theme.breakpoints.down(210)]: {
      fontSize: '16px'
    }
  },
  gridMainLeftBottom: {
    maxWidth: '100% !important',
    flexBasis: '100% !important',
    [theme.breakpoints.up(1150)]: {
      height: '35vh'
    },
    [theme.breakpoints.down(1150)]: {
      marginTop: '2%'
    },
    [theme.breakpoints.down(1010)]: {
      height: '7vh'
    },
    [theme.breakpoints.down(660)]: {
      height: '15vh',
    },
    [theme.breakpoints.down(460)]: {
      marginTop: '5%',
      height: '10vh',
    }
  },
  gridMainRight: {
    [theme.breakpoints.up(1150)]: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important'
    },
    [theme.breakpoints.down(1150)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      display: "flex",
      marginTop: '12%'
    },
    [theme.breakpoints.down(460)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important',
      display: "flex",
      marginTop: '20%'
    }
  },
  dividerStyle: {
    [theme.breakpoints.up(1150)]: {
      width: '70%',
      margin: 'auto',
      backgroundColor: 'rgb(169 169 169)'
    },
    [theme.breakpoints.down(1150)]: {
      display: 'none'
    }
  },
  gridMainRightBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    height: "33.33%",
    width: "100%",
    [theme.breakpoints.down(1150)]: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important'
    }
  },
  gridMainRightBoxUnder: {
    maxWidth: '50% !important',
    flexBasis: '50% !important',
    [theme.breakpoints.down(1150)]: {
      maxWidth: '100% !important',
      flexBasis: '100% !important'
    }
  },
  mainRightBoxUnderLeft: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down(1150)]: {
      justifyContent: 'center'
    }
  },
  mainRightBoxUnderRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "80%",
    textAlign: "center",
    [theme.breakpoints.down(1150)]: {
      width: "100%"
    }
  },
  imgLogo: {
    width: "200px",
    [theme.breakpoints.down(660)]: {
      width: "150px"
    },
    [theme.breakpoints.down(460)]: {
      width: "100px"
    }
  },
  titleDesc: {
    color: '#E8E8E8',
    [theme.breakpoints.down(430)]: {
      fontSize: "18px"
    },
    [theme.breakpoints.down(390)]: {
      fontSize: "16px"
    },
    [theme.breakpoints.down(345)]: {
      fontSize: "14px"
    }
  },
  buttonClick: {
    padding: '18px',
    border: '2px solid #fff',
    borderRadius: '30px',
    color: '#ffff',
    margin: '15px',
    textTransform: 'none',
    fontSize: '18px',
    width: '400px',
    [theme.breakpoints.down(430)]: {
      fontSize: '16px',
    }
  },
  logoMain: {
    width: "64px",
    [theme.breakpoints.down(430)]: {
      width: "48px"
    }
  }
}));

export default styles