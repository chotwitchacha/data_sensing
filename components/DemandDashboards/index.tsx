import React, { useRef, useState, useEffect } from 'react'
import { Box, Grid, IconButton, MenuItem, Menu } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { useStyles } from './DemandDashboards.style'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import TableData from './../TableData'
import axios, { AxiosResponse } from "axios"
import {
  trendColumn, storeColumn, groupColumn, classColumn, brandColumn,
  storeColumnPredict, groupColumnPredict, classColumnPredict, brandColumnPredict
} from './demandCenter'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import fileDownload from 'js-file-download'

const TrendPredict = dynamic(
  () => import('./TrendPredict'),
  { ssr: false }
)

const Store = dynamic(
  () => import('./Store'),
  { ssr: false }
)

const Group = dynamic(
  () => import('./Group'),
  { ssr: false }
)

const ClassChart = dynamic(
  () => import('./ClassChart'),
  { ssr: false }
)

const Brand = dynamic(
  () => import('./Brand'),
  { ssr: false }
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ITrendData {
  sales: number
  date: string
  SALES_PREDICT: number
}

interface IStoreData {
  sales_amt: number
  store: string
  SALES_PREDICT: number
}

interface IGroupData {
  groups: string
  sales_amt: number
  SALES_PREDICT: number
}

interface IClassChartData {
  class: string
  sales_amt: number
  SALES_PREDICT: number
}

interface IBrandData {
  brand: string
  sales_amt: number
  SALES_PREDICT: number
}

interface ITrendDataAll {
  start_date: Date
  end_date: Date
  data: ITrendData[]
}

interface ILoading {
  lTrend: boolean
  lStore: boolean
  lGroup: boolean
  lClass: boolean
  lBrand: boolean
}

interface IPropsDashboard {
  drawerOpen: boolean
  trendData: ITrendDataAll
  storeData: IStoreData[]
  groupData: IGroupData[]
  classChartData: IClassChartData[]
  brandData: IBrandData[]
  loadingChart: ILoading
  isPredict: boolean
  startDate: any
  endDate: any
  filterList: any
}

const DemandDashboards = ({ drawerOpen, trendData, storeData, groupData, classChartData, brandData, loadingChart, isPredict, startDate, endDate, filterList }: IPropsDashboard) => {
  const classes = useStyles()

  const trendRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const classChartRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentRowPerPage: 15,
    totalPage: 1,
    totalData: 1
  })
  const [titleTable, setTitleTable] = useState("")
  const [titleTableName, setTitleTableName] = useState("")
  const [urlApiData, setUrlApiData] = useState("")
  const [tableList, setTableList] = useState([])
  const [columnList, setColumnList] = useState([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAnchorElClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorElClose = (type) => {
    switch (type) {
      case "xlsx":
        downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
        break
      case "csv":
        downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
        break
      case "pdf":
        downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
        break
      default:
        break
    }
    setAnchorEl(null);
  }

  const downloadFile = async (url, filename) => {
    const body = {
      start_date: startDate,
      end_date: endDate,
      filter_list: filterList,
      is_predict: isPredict
    }
    axios.post(`http://localhost:8080${url}`, body, { responseType: 'blob' })
      .then(function (res) {
        // handle success
        // const url = window.URL.createObjectURL(new Blob([res.data]))
        // window.open(url)
        fileDownload(res.data, filename)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })

  }

  const handleClickOpen = (name, title, urlApi, columnLists) => {
    setColumnList(columnLists)
    getTableData(name, title, urlApi)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTableData = async (name, title, urlApi) => {
    setTitleTableName(name)
    setTitleTable(title)
    setUrlApiData(urlApi)

    const bodyData = {
      start_date: startDate,
      end_date: endDate,
      filter_list: filterList,
      is_predict: isPredict
    }

    await axios.post(`http://localhost:8080${urlApi}`, bodyData)
      .then(function (res) {
        // handle success
        const tableRes = res.data
        setTableList(tableRes.data)
        setPagination({
          currentPage: tableRes.current_page,
          currentRowPerPage: tableRes.rows_perpage,
          totalPage: tableRes.total_page,
          totalData: tableRes.total_data
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  const updateDataCallback = (rowsPerpage, currentPage) => {
    const bodyData = {
      start_date: startDate,
      end_date: endDate,
      filter_list: filterList,
      is_predict: isPredict,
      rows_perpage: rowsPerpage,
      current_page: currentPage
    }

    axios.post(`http://localhost:8080${urlApiData}`, bodyData)
      .then(function (res) {
        // handle success
        const tableRes = res.data
        setTableList(tableRes.data)
        setPagination({
          currentPage: tableRes.current_page,
          currentRowPerPage: tableRes.rows_perpage,
          totalPage: tableRes.total_page,
          totalData: tableRes.total_data
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }
  const tableActionUpdate = (page: number, rowsPerPage: number, filterList: any) => {
    updateDataCallback(rowsPerPage, page)
  }

  return (
    <Box >
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          fullWidth={true}
          maxWidth="lg"
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{ height: '100%' }}
        >
          {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <Box
              display="flex"
              justifyContent="right"
              alignItems="center"
              height="100%"
              width="100%"
              marginBottom="15px"
            >
              <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.resetB} onClick={handleAnchorElClick}>
                <ArrowDropDownIcon />Export
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleAnchorElClose("")}
              >
                <MenuItem onClick={() => handleAnchorElClose("xlsx")}>Export as xlsx</MenuItem>
                <MenuItem onClick={() => handleAnchorElClose("csv")}>Export as csv</MenuItem>
                <MenuItem onClick={() => handleAnchorElClose("pdf")} >Export as pdf</MenuItem>
              </Menu>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <Box height="100%" width="100%">
                <TableData
                  title={titleTable}
                  TableDataList={tableList}
                  columns={columnList}
                  HeaderElements={null}
                  pagination={pagination}
                  tableActionUpdate={tableActionUpdate}
                  tableId="demand"
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid container>
        <Grid item className={classes.trendGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <div
              ref={trendRef}
              className={clsx(classes.trendBox, classes.boxDB)}
            >
              {
                loadingChart.lTrend || trendData.data.length === 0
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
                    <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '15px', color: "#686868" }}>
                      Trend
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <TrendPredict
                        data={trendData.data}
                      />
                    </Box>
                    <Box style={{ right: '0', bottom: '0', position: 'absolute' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => handleClickOpen("trend", "Trend", "/get_trend_table", trendColumn)}
                      >
                        <AddBoxIcon style={{ color: '#757575' }} />
                      </IconButton>
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.storeGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <div
              ref={storeRef}
              className={clsx(classes.storeBox, classes.boxDB)}
            >
              {
                loadingChart.lStore || storeData.length === 0
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
                    <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '15px', color: "#686868" }}>
                      Sale amount by store
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Store
                        data={storeData}
                        isPredict={isPredict}
                      />
                    </Box>
                    <Box style={{ right: '0', bottom: '0', position: 'absolute' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => handleClickOpen("sales_by_store", "Sale amount by store", "/get_sales_by_store_table", isPredict ? storeColumnPredict : storeColumn)}
                      >
                        <AddBoxIcon style={{ color: '#757575' }} />
                      </IconButton>
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.groupGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <div
              ref={groupRef}
              className={clsx(classes.groupBox, classes.boxDB)}
            >
              {
                loadingChart.lGroup || groupData.length === 0
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
                    <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '15px', color: "#686868" }}>
                      Market share by product group
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Group
                        data={groupData}
                        isPredict={isPredict}
                      />
                    </Box>
                    <Box style={{ right: '0', bottom: '0', position: 'absolute' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => handleClickOpen("market_share_by_group", "Market share by product group", "/get_market_share_by_group_table", isPredict ? groupColumnPredict : groupColumn)}
                      >
                        <AddBoxIcon style={{ color: '#757575' }} />
                      </IconButton>
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.classGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <div
              ref={classChartRef}
              className={clsx(classes.classBox, classes.boxDB)}
            >
              {
                loadingChart.lClass || classChartData.length === 0
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
                    <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '15px', color: "#686868" }}>
                      Sale amount by class
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <ClassChart
                        data={classChartData}
                        isPredict={isPredict}
                      />
                    </Box>
                    <Box style={{ right: '0', bottom: '0', position: 'absolute' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => handleClickOpen("sales_amt_by_class", "Sale amount by class", "/get_sales_amt_by_class_table", isPredict ? classColumnPredict : classColumn)}
                      >
                        <AddBoxIcon style={{ color: '#757575' }} />
                      </IconButton>
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.brandGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <div
              ref={brandRef}
              className={clsx(classes.brandBox, classes.boxDB)}
            >
              {
                loadingChart.lBrand || brandData.length === 0
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
                    <Box style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', paddingLeft: '15px', color: "#686868" }}>
                      Sale amount by brand
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Brand
                        data={brandData}
                        isPredict={isPredict}
                      />
                    </Box>
                    <Box style={{ right: '0', bottom: '0', position: 'absolute' }}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => handleClickOpen("sales_amt_by_brand", "Sale amount by brand", "/get_sales_amt_by_brand_table", isPredict ? brandColumnPredict : brandColumn)}
                      >
                        <AddBoxIcon style={{ color: '#757575' }} />
                      </IconButton>
                    </Box>
                  </>
              }
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DemandDashboards