import React, { useRef, useState, useEffect } from 'react'
import { Box, Grid, Divider } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { useStyles } from './InventoryDashboards.style'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const InventoryPredict = dynamic(
  () => import('./InventoryPredict'),
  { ssr: false }
)

interface IGraphData {
  day_of_date: string
  inventory?: number
  inventory_predict?: number
  sales_accumulated_predict?: number
  sales_predict?: number
  z?: number
  Reorder_Point?: number
  Date_of_arrival_point?: number
}

interface IAllGraphData {
  data: IGraphData[]
  brand: string
  product: string
  sku: string
}

interface IProperties {
  consumption_rate: number
  expected_out_of_stock: string
  expected_reorder_date: string
  expected_replenishment_stock: number
  lead_time: number
  onhands: number
}

interface IPropsDashboard {
  drawerOpen: boolean
  graphData: IAllGraphData
  loadingChart: boolean
  propertiesData: IProperties
}

const InventoryDashboards = ({ drawerOpen, graphData, loadingChart, propertiesData }: IPropsDashboard) => {
  const classes = useStyles()

  const trendRef = useRef<HTMLDivElement>(null)

  return (
    <Box >
      <Grid container style={{ marginTop: '20px' }}>
        <Grid item className={classes.infoGrid}>
          <Box className={classes.infoBox}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              className={classes.topBox}
              style={{ backgroundColor: '#ffffff', borderRadius: '25px' }}
            >
              <Grid container justifyContent='center'>
                  <Box className={classes.infoGridRight}>
                    <Box style={{ fontSize: '25px', fontWeight: 'bolder', width: '80%' }}>
                      Brand:
                    </Box>
                    <Box style={{ fontSize: '25px', fontWeight: '400', width: '60%' }}>
                      {graphData.brand}
                    </Box>
                  </Box>
                  <Box className={classes.infoGridRight}>
                    <Box style={{ fontSize: '25px', fontWeight: 'bolder', width: '80%' }}>
                      Product Name:
                    </Box>
                    <Box style={{ fontSize: '25px', fontWeight: '400', width: '60%' }}>
                      {graphData.product}
                    </Box>
                  </Box>
                  <Box className={classes.infoGridRight}>
                    <Box style={{ fontSize: '25px', fontWeight: 'bolder', width: '80%' }}>
                      SKU:
                    </Box>
                    <Box style={{ fontSize: '25px', fontWeight: '400', width: '60%' }}>
                      {graphData.sku}
                    </Box>
                  </Box>
                  <Box className={classes.infoGridRight}>
                    <Box style={{ fontSize: '25px', fontWeight: 'bolder', width: '80%' }}>
                      Color:
                    </Box>
                    <Box style={{ fontSize: '25px', fontWeight: '400', width: '60%' }}>
                      Black
                    </Box>
                  </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.detailGrid}>
          <Box className={classes.detailBox}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              className={classes.topBox}
              style={{ backgroundColor: '#ffffff', borderRadius: '25px' }}
            >
              <Grid container style={{ height: '100%' }}>
                <Grid item className={classes.detailLeftGrid}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <Box height="100%">
                      <Box
                        width="100%"
                        height="20%"
                        style={{ fontSize: '20px', textAlign: 'center' }}
                      >
                        On - Hands
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="60%"
                      >
                        <img src="/assets/boxes.png" width="100px" style={{ opacity: '0.6' }} />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="20%"
                        style={{ fontSize: '24px', fontWeight: 'bolder', textAlign: 'center' }}
                      >
                        {propertiesData.onhands} Units
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item className={classes.detailCenterGrid}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <Box height="100%">
                      <Box
                        width="100%"
                        height="20%"
                        style={{ fontSize: '20px', textAlign: 'center' }}
                      >
                        Consumption Rate
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="60%"
                      >
                        <img src="/assets/consumption.png" width="100px" style={{ opacity: '0.6' }} />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="20%"
                        style={{ fontSize: '24px', fontWeight: 'bolder', textAlign: 'center' }}
                      >
                        {propertiesData.consumption_rate} Units/Day
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item className={classes.detailRightGrid}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <Box height="100%">
                      <Box
                        width="100%"
                        height="20%"
                        className={classes.expected}
                      >
                        Expected Replenishment Stock
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="60%"
                      >
                        <img src="/assets/package.png" width="100px" style={{ opacity: '0.6' }} />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="20%"
                        style={{ fontSize: '24px', fontWeight: 'bolder', textAlign: 'center' }}
                      >
                        {propertiesData.expected_replenishment_stock} Units
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.trendGrid}>
          <Box className={classes.trendInsideBox}>
            <div
              ref={trendRef}
              className={clsx(classes.trendBox, classes.boxDB)}
            >
              {
                loadingChart || graphData.data.length === 0
                  ?
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <CircularProgress style={{ color: "#5d40d2" }} />
                  </Box>
                  : <>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <InventoryPredict
                        data={graphData.data}
                      />
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.tableGrid}>
          <Box
            height="100%"
            width="100%"
          >
            <Box className={clsx(classes.topBox, classes.EOS)}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Grid container style={{ height: '100%' }}>
                  <Grid item className={classes.tableLogoGrid}>
                    <Box
                      display="flex"
                      justifyContent="left"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingLeft="20px"
                    >
                      <Box
                        style={{
                          color: '#5D40D2',
                          fontSize: '34px',
                          fontWeight: 'bolder',
                          backgroundColor: 'rgba(196, 196, 196, 0.21)',
                          borderRadius: '10px',
                          width: '50%',
                          height: '60%'
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          width="100%"
                        >
                          EOS
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item className={classes.tableDetailGrid}>
                    <Box
                      display="flex"
                      justifyContent="right"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingRight="20px"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      <Box height="100%">
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#333333"
                        >
                          Expected out of stock
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#007171"
                        >
                          {propertiesData.expected_out_of_stock}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={clsx(classes.topBox, classes.LT)}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Grid container style={{ height: '100%' }}>
                  <Grid item className={classes.tableLogoGrid}>
                    <Box
                      display="flex"
                      justifyContent="left"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingLeft="20px"
                    >
                      <Box
                        style={{
                          color: '#5D40D2',
                          fontSize: '34px',
                          fontWeight: 'bolder',
                          backgroundColor: 'rgba(196, 196, 196, 0.21)',
                          borderRadius: '10px',
                          width: '50%',
                          height: '60%'
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          width="100%"
                        >
                          LT
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item className={classes.tableDetailGrid}>
                    <Box
                      display="flex"
                      justifyContent="right"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingRight="20px"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      <Box height="100%">
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#333333"
                        >
                          Lead Time
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#6D6D6D"
                        >
                          {propertiesData.lead_time} Days
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={clsx(classes.topBox, classes.ERD)}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Grid container style={{ height: '100%' }}>
                  <Grid item className={classes.tableLogoGrid}>
                    <Box
                      display="flex"
                      justifyContent="left"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingLeft="20px"
                    >
                      <Box
                        style={{
                          color: '#5D40D2',
                          fontSize: '34px',
                          fontWeight: 'bolder',
                          backgroundColor: 'rgba(196, 196, 196, 0.21)',
                          borderRadius: '10px',
                          width: '50%',
                          height: '60%'
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          width="100%"
                        >
                          ERD
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item className={classes.tableDetailGrid}>
                    <Box
                      display="flex"
                      justifyContent="right"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      paddingRight="20px"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      <Box height="100%">
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#333333"
                        >
                          Expected Reorder Date
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="right"
                          alignItems="center"
                          height="50%"
                          width="100%"
                          color="#FF1818"
                        >
                          {propertiesData.expected_reorder_date}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={classes.BottomBox}></Box>
          </Box>
        </Grid>
      </Grid>
    </Box >
  )
}

export default InventoryDashboards