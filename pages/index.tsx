import { Button, Box, Grid, Divider } from '@material-ui/core'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@componentsShare/Component'
import styles from '@styles/Main.styles'

export const getServerSideProps: GetServerSideProps = async () => {

  return {
    props: {}
  }
}

const Home = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = styles()
  const router = useRouter()

  return (
    <Layout
      defaultDrawer={false}
      setDrawer={false}
      title=""
      tabChildren={<></>}
      isHomePage={true}
    >
      <Box className={classes.Main}>
        <Grid container style={{ height: '100vh' }}>
          <Grid item className={classes.gridMainLeft}>
            <Grid container >
              <Grid item className={classes.gridMainLeftTop}>
                <Box className={classes.gridMainLeftTopBox} >
                  <Box>
                    <Box className={classes.gridMainLeftTopTextMain}>
                      {`Planning & Replanishment`}
                    </Box>
                    <Box className={classes.gridMainLeftTopTextEnd}>
                      {`End-To-End`}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item className={classes.gridMainLeftBottom}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="50%"
                  width="100%"
                >
                  <Button
                    id="main-button"
                    onClick={() => router.push({ pathname: `/inventory-forecasting/reports` })}
                    className={classes.buttonClick}
                  >
                    <img src="/main/inventory.png" className={classes.logoMain} />
                    <span style={{ marginLeft: '10px' }}>Inventory Forecasting</span>
                  </Button>
                  <Button
                    id="main-button"
                    onClick={() => router.push({ pathname: `/demand-forecasting` })}
                    className={classes.buttonClick}
                  >
                    <img src="/main/demand.png" className={classes.logoMain} />
                    <span style={{ marginLeft: '10px' }}>Demand Forecasting</span>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridMainRight}>
            <Box className={classes.gridMainRightBox}>
              <Grid container>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderLeft}>
                    <img src="/main/check.png" className={classes.imgLogo} />
                  </Box>
                </Grid>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderRight}>
                    <h2 className={classes.titleDesc}>Check Stock On-Hands</h2>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider className={classes.dividerStyle} />
            <Box className={classes.gridMainRightBox}>
              <Grid container>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderLeft}>
                    <img src="/main/replenishment.png" className={classes.imgLogo} />
                  </Box>
                </Grid>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderRight}>
                    <h2 className={classes.titleDesc}>Replenishment Stock</h2>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider className={classes.dividerStyle} />
            <Box className={classes.gridMainRightBox}>
              <Grid container>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderLeft}>
                    <img src="/main/product.png" className={classes.imgLogo} />
                  </Box>
                </Grid>
                <Grid item className={classes.gridMainRightBoxUnder}>
                  <Box className={classes.mainRightBoxUnderRight}>
                    <h2 className={classes.titleDesc}>Product To Sell To Customers</h2>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid >
      </Box >
    </Layout>
  )
}

export default Home
