import { Button, Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@componentsShare/Layout'
import { useStyles } from './InventoryDashboardAll.style'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { SaleForecast }   from '@components/Component'



const InventoryDashboardAll = () => {
    const router = useRouter()  
    const classes = useStyles()


    return (
        <Box>
            <Grid container>
            <Grid item className={classes.gridMainLeftBottom}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  height="50%"
                  width="100%"
                >
                  <Button
                    id="main-button"
                    onClick={() => router.push({ pathname: `/inventory-forecasting/reports` })}
                    className={clsx(classes.buttonClick,classes.bgButton)}
                  >
                    <span style={{ marginLeft: '10px' }}>All Product Report</span>
                  </Button>
                  <Button
                    id="main-button"
                    onClick={() => router.push({ pathname: `/inventory-forecasting/forecastReport` })}
                    className={clsx(classes.buttonClick,classes.bgButton)}
                  >
                    <span style={{ marginLeft: '10px' }}>Forecast Report</span>
                  </Button>
                  <Button
                    id="main-button"
                    onClick={() => router.push({ pathname: `/inventory-forecasting/totalOrder` })}
                    className={clsx(classes.buttonClick,classes.bgButton)}
                  >
                    <span style={{ marginLeft: '10px' }}>Total Order</span>
                  </Button>
                </Box>
              </Grid>
                <Grid item className={classes.AllGrid}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        width="100%"
                    >
                        <div
                          className={classes.boxDB}
                        >
                          <Grid container>
                          <Grid item xs={6}>
                            <Box
                              style={{borderRadius: '10px 0 0 0'}}
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/EstimateTimeOfDeparture.png"/>
                                <p className={classes.textNum}>128</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Estimate time of departure</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              style={{borderRadius: '0 10px 0 0'}}
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/EstimateTimeOfArrival.png"/>
                                <p className={classes.textNum}>55</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Estimate time of arrival</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/TotalStock.png"/>
                                <p className={classes.textNum}>183</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Total Stock</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/SaleForcast.png"/>
                                <p className={classes.textNum}>90</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Sale Forecast</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              style={{borderRadius: '0 0 0 10px'}}
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/Remain.png"/>
                                <p className={classes.textNum}>93</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Remain end of month</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              style={{borderRadius: '0 0 10px 0'}}
                              className={classes.boxItem}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                alignItems="center"
                                height="58%"
                                width="100%"
                              >
                                <img src="/InventoryIcon/Month.png"/>
                                <p className={classes.textNum}>1.03</p><br/>
                              </Box>
                              <Box>
                                <p className={classes.textItem}>Month of Sale Out</p>
                              </Box>
                            </Box>
                          </Grid>
                          </Grid>
                        </div>
                        
                    </Box>
                </Grid>
                <Grid item className={classes.AllGrid}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        width="100%"
                    >
                        <div
                            className={classes.boxDB}
                        >
                            <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '20px', color: "#686868" , paddingTop: '15px'}}>
                                Sales Forecast
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              height="fit-content"
                              width="100%"
                              style={{ marginTop: '10%'}}
                            >
                              <SaleForecast/>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="100%"
                            >
                              <img className={classes.lableDashboard} src="/InventoryIcon/number.png"/>
                              <p>The number of products expected to be sold</p>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="100%"
                            >
                              <img className={classes.lableDashboard} src="/InventoryIcon/expected.png"/>
                              <p>expected Available  Product </p>
                            </Box>
                        </div>
                        
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InventoryDashboardAll