import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    AllGrid: {
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
      boxDB: {
        border: '2px solid #c9c9c9',
        width: '95%',
        height: '600px',
        position: "relative",
        textAlign: "center",
        borderRadius: '15px'
      },
      gridMainLeftBottom: {
        maxWidth: '100% !important',
        flexBasis: '100% !important',
        [theme.breakpoints.up(1150)]: {
            marginTop: '5%',
            marginBottom: '1%'
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
      buttonClick: {
        padding: '18px',
        borderRadius: '23px',
        color: '#6D6D6D',
        margin: '15px',
        textTransform: 'none',
        fontSize: '18px',
        width: '300px',
        [theme.breakpoints.down(430)]: {
          fontSize: '16px',
        }
      },
      bgButton: {
        backgroundColor: 'rgba(198, 210, 229, 0.44)',
        boxShadow: '0px 1px 10px 0px'
      },
      boxItem: {
        border: '1px solid rgba(185, 185, 185, 0.3)',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "200px",
        width: "100%",
        flexDirection: 'column'
      },
      textItem: {
        fontSize: '24px',
        fontStyle: 'Bold',
        color: '#707070'
      },
      textNum: {
        fontSize: '46px',
        fontStyle: 'Bold',
        color: '#707070'
      },
      lableDashboard: {
        marginRight: '5%'
      }
}))