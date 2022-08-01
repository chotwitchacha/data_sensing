import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import 'date-fns';
import { Layout } from '@componentsShare/Component';
import { TableData } from '@components/Component';
import { Typography, TextField, IconButton, Tooltip, Menu, Box, Grid, MenuItem, Button, Divider, Accordion, AccordionSummary, AccordionDetails, useTheme, ListItemText, OutlinedInput,} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { BackButton } from '@components/Component';
import { createTheme } from '@material-ui/core/styles';
import TableChartIcon from '@material-ui/icons/TableChart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Checkbox } from '@mui/material';
import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    applyB: {
      backgroundColor: '#5D40D2',
      color: '#ffffff',
      boxShadow: 'none',
      border: '1px solid #5D40D2',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#5D40D2',
      },
    },
    filterBox: {
      width: '1000px',
      height: '100%',
      [theme.breakpoints.down(1035)]: {
        width: '100%',
      },
    },
    filterTitle: {
      padding: '0 16px',
      width: '20%',
      color: '#707070',
      [theme.breakpoints.down(970)]: {
        width: '30%',
      },
      [theme.breakpoints.down(710)]: {
        width: '40%',
      },
      [theme.breakpoints.down(580)]: {
        width: '50%',
      },
      [theme.breakpoints.down(505)]: {
        width: '60%',
      },
      [theme.breakpoints.down(460)]: {
        width: '70%',
      },
    },
    filterMain: {
      maxWidth: '50% !important',
      flexBasis: '50% !important',
      [theme.breakpoints.down(620)]: {
        maxWidth: '100% !important',
        flexBasis: '100% !important',
      },
    },
    filterLeft: {
      maxWidth: '33.33% !important',
      flexBasis: '33.33% !important',
      [theme.breakpoints.down(850)]: {
        maxWidth: '100% !important',
        flexBasis: '100% !important',
      },
    },
    filterRight: {
      maxWidth: '66.66% !important',
      flexBasis: '66.66% !important',
      [theme.breakpoints.down(850)]: {
        maxWidth: '100% !important',
        flexBasis: '100% !important',
      },
    },
    filterBoxMain: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px 0px 16px 100px',
      height: '75%',
      color: '#707070',
      [theme.breakpoints.down(620)]: {
        padding: '16px 25px',
        overflowY: 'auto',
        height: '500px',
      },
    },
    gridFilterBoxMain: {
      [theme.breakpoints.down(620)]: {
        height: '500px',
      },
    },
    textField70: {
      width: '70%',
      [theme.breakpoints.down(620)]: {
        width: '100%',
      },
    },
    textField30: {
      marginLeft: '10px',
      width: '30%',
      [theme.breakpoints.down(620)]: {
        width: '80%',
      },
    },
    datePicker: {
      paddingLeft: '10px',
      width: '70%',
      [theme.breakpoints.down(620)]: {
        width: '85%',
      },
    },
    AccordionStyle: {
      border: '1px solid #e0e0e0',
      borderRight: '0px',
      borderLeft: '0px',
      margin: '0px !important',
      boxShadow: 'none',
    },
    resetA: {
      backgroundColor: '#5D40D2',
      color: '#FFFFFF',
      marginLeft: '15px',
      boxShadow: 'none',
      border: '1px solid #DBDBDB',
      // '&:hover': {
      //   boxShadow: 'none',
      //   backgroundColor: "#FFFFFF"
      // }
    },
    multi_select: {
      maxWidth: '300px',
    },
  })
);

const columns = [
  {
    name: 'orderDate',
    label: 'Order Date',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Typography component={'span'} noWrap={false}>
            <span>Dec 01, 2021 </span>
          </Typography>
        );
      },
    },
    value: 'Order Date',
  },

  {
    name: 'saleOrder',
    label: 'Sale Order',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Typography component={'span'} noWrap={false}>
            <span>Dec 01, 2021</span>
          </Typography>
        );
      },
    },
    value: 'Sale Order',
  },
  {
    name: 'onThewWay',
    label: 'On The Way',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Typography component={'span'} noWrap={false}>
            <span>15</span>
          </Typography>
        );
      },
    },
    value: 'On The Way',
  },
  {
    name: 'recieveOreder',
    label: 'Recieve Oreder',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Typography component={'span'} noWrap={false}>
            <span>5</span>
          </Typography>
        );
      },
    },
    value: 'Recieve Oreder',
    
  },
  {
    name: 'replenishStockDate',
    label: 'Replenish Stock Date',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return (
          <Typography component={'span'} noWrap={false}>
            <span>15 Dec 2021</span>
          </Typography>
        );
      },
    },
    value: 'Replenish Stock Date',
  }
];

interface IItemList {
  selectItem: boolean;
  name: string;
}

interface IFilterListAll {
  itemField: IItemList[];
}

const operatorList = [
  { value: '', label: 'None' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: '>=' },
  { value: 'lt', label: '<' },
  { value: 'lte', label: '<=' },
  { value: 'eq', label: '=' },
];

const options = [
  'Description',
  'Unit Price',
  'Replenish Stock Date',
  'Total Stock',
  'Sold Stock',
  'Run Rate/Month',
  'On-Hand',
  'On Hold',
  'Aging',
  'Available to Purchase',
  'AP+OTW',
  'Month of Sale out',
];

const filterDefault = {
  brand: {
    value: '',
  },
  product: {
    value: '',
  },
  sku: {
    value: '',
  },
  onHand: {
    value: '',
    operator: '',
  },
  consumptionRate: {
    value: '',
    operator: '',
  },
  expectedReplenishmentStock: {
    value: '',
    operator: '',
  },
  expectedReorderDate: {
    value: null,
    operator: '',
  },
};

interface ITrendData {
  sales: number;
  date: string;
  SALES_PREDICT: number;
}

interface IStoreData {
  sales_amt: number;
  store: string;
  SALES_PREDICT: number;
}

interface IGroupData {
  groups: string;
  sales_amt: number;
  SALES_PREDICT: number;
}

interface IClassChartData {
  class: string;
  sales_amt: number;
  SALES_PREDICT: number;
}

interface IBrandData {
  brand: string;
  sales_amt: number;
  SALES_PREDICT: number;
}

interface ITrendDataAll {
  start_date: Date;
  end_date: Date;
  data: ITrendData[];
}

interface IItemList {
  selectItem: boolean;
  name: string;
}

interface ILoading {
  lTrend: boolean;
  lStore: boolean;
  lGroup: boolean;
  lClass: boolean;
  lBrand: boolean;
}

interface IFilterListAll {
  store: IItemList[];
  group: IItemList[];
  classList: IItemList[];
  brand: IItemList[];
  product: IItemList[];
}

interface IItemList {
  selectItem: boolean;
  name: string;
}

interface IFilterListAll {
  store: IItemList[];
  group: IItemList[];
  classList: IItemList[];
  brand: IItemList[];
  product: IItemList[];
}

interface ISearchFilter {
  storeValue: string;
  groupValue: string;
  classListValue: string;
  brandValue: string;
  productValue: string;
}

interface IPropsFilter {
  startDate: Date;
  endDate: Date;
  resetFunc: () => void;
  getData: (startDate: Date, endDate: Date, filterList: IFilterListAll, is_predict: boolean) => void;
  disbleButton: boolean;
  filterList: IFilterListAll;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const getServerSideProps: GetServerSideProps = async () => {
  const trendApiRes: AxiosResponse<ITrendDataAll> = await axios
    .post(`http://localhost:8000/get_trend_graph`, {})
    .then((res) => res);
  const storeApiRes: AxiosResponse<IStoreData[]> = await axios
    .post(`http://localhost:8000/get_sales_by_store_graph`, {})
    .then((res) => res);
  const groupApiRes: AxiosResponse<IGroupData[]> = await axios
    .post(`http://localhost:8000/get_market_share_by_group_graph`, {})
    .then((res) => res);
  const classChartApiRes: AxiosResponse<IClassChartData[]> = await axios
    .post(`http://localhost:8000/get_sales_amt_by_class_graph`, {})
    .then((res) => res);
  const brandApiRes: AxiosResponse<IBrandData[]> = await axios
    .post(`http://localhost:8000/get_sales_amt_by_brand_graph`, {})
    .then((res) => res);
  const filterApiRes: AxiosResponse<IBrandData[]> = await axios
    .post(`http://localhost:8000/get_all_filter_list`, {})
    .then((res) => res);
  const tableData: AxiosResponse<any> = (await axios.post(`http://localhost:8000/get_invent_report_page`, {})).data;
  return {
    props: {
      tableData: tableData,
      trendData: trendApiRes.data,
      storeData: storeApiRes.data,
      groupData: groupApiRes.data,
      classChartData: classChartApiRes.data,
      brandData: brandApiRes.data,
      filterApiRes: filterApiRes.data,
    },
  };
};

const reports = ({
  tableData,
  trendData,
  storeData,
  groupData,
  classChartData,
  brandData,
  filterApiRes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const classes = useStyles();

  const [trendDataIn, setTrendDataIn] = useState<ITrendDataAll>(trendData);
  const [storeDataIn, setStoreDataIn] = useState<IStoreData[]>(storeData);
  const [groupDataIn, setGroupDataIn] = useState<IGroupData[]>(groupData);
  const [classChartDataIn, setClassChartDataIn] = useState<IClassChartData[]>(classChartData);
  const [brandDataIn, setBrandDataIn] = useState<IBrandData[]>(brandData);
  const [startEndDate, setStartEndDate] = useState({
    startDate: trendDataIn.start_date,
    EndDate: trendDataIn.end_date,
  });
  const [filterList, setFilterList] = useState<IFilterListAll>(filterApiRes);
  const [disbleButton, setDisbleButton] = useState<boolean>(false);
  const [loadingChart, setLoadingChart] = useState<ILoading>({
    lTrend: false,
    lStore: false,
    lGroup: false,
    lClass: false,
    lBrand: false,
  });

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [templateSelected, setTemplateSelected] = useState<Array<number>>([]);
  const [reportTableData, setReportTableData] = useState([...tableData.report_data]);
  const [pagination, setPagination] = useState({
    currentPage: tableData.current_page,
    currentRowPerPage: tableData.rows_perpage,
    totalPage: tableData.total_page,
    totalData: tableData.total_data,
  });
  const [storeList, setStoreList] = useState<IItemList[]>(filterList.store);
  const [groupList, setGroupList] = useState<IItemList[]>(filterList.group);
  const [classListList, setClassListList] = useState<IItemList[]>(filterList.classList);
  const [brandList, setBrandList] = useState<IItemList[]>(filterList.brand);
  const [productList, setProductList] = useState<IItemList[]>(filterList.product);
  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    storeValue: '',
    groupValue: '',
    classListValue: '',
    brandValue: '',
    productValue: '',
  });
  const [valueSwitch, setValueSwitch] = useState<boolean>(false);
  const [tempFilter, setTempFilter] = useState({ ...filterDefault });
  const [expanded, setExpanded] = useState<string | false>('0');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemField, setItemField] = useState<null | HTMLElement>(null); 
  const [personName, setPersonName] = useState(options);
  const [columnNew,setColumnNew] = useState(columns);
  

  useEffect(() => {
    const localStorageFilter = JSON.parse(localStorage.getItem('filter'));
    const localStorageCurrentPage = JSON.parse(localStorage.getItem('current_page'));
    const localStorageRowsPerPage = JSON.parse(localStorage.getItem('rows_perpage'));
    setTempFilter({ ...localStorageFilter });
    const filters = {
      brand: localStorageFilter.brand.value,
      product: localStorageFilter.product.value,
      sku: localStorageFilter.sku.value,
      on_hand: localStorageFilter.onHand,
      consumption_rate: localStorageFilter.consumptionRate,
      expected_replenishment_stock: localStorageFilter.expectedReplenishmentStock,
      expected_reorder_date: localStorageFilter.expectedReorderDate,
    };
    updateDataCallback(localStorageCurrentPage, localStorageRowsPerPage, filters);
  }, []);

  const setDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const updateDataCallback = async (page: number, rowsPerPage: number, filterList: any) => {
    let count: number[] = [];
    const body = {
      filter_list: filterList,
      current_page: page,
      rows_perpage: rowsPerPage,
    };
    localStorage.setItem('current_page', JSON.stringify(page));
    localStorage.setItem('rows_perpage', JSON.stringify(rowsPerPage));
    axios
      .post(`http://localhost:8000/get_invent_report_page`, body)
      .then(function (res) {
        // handle success
        const data = res.data;
        setReportTableData(data.report_data);
        setPagination({
          currentPage: data.current_page,
          currentRowPerPage: data.rows_perpage,
          totalPage: data.total_page,
          totalData: data.total_data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        count.push(1);
        if (count.length === 3) {
          // setDisbleButton(false)
        }
        // setLoadingChart(false)
      });
  };
  const tableActionUpdate = (page: number, rowsPerPage: number, filterList: any) => {
    const filters = {
      brand: filterList.brand.value,
      product: filterList.product.value,
      sku: filterList.sku.value,
      on_hand: filterList.onHand,
      consumption_rate: filterList.consumptionRate,
      expected_replenishment_stock: filterList.expectedReplenishmentStock,
      expected_reorder_date: filterList.expectedReorderDate,
    };
    updateDataCallback(page, rowsPerPage, filters);
  };

  const HeaderElements = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [filter, setFilter] = useState({ ...tempFilter });

    const handleChange = (event: React.ChangeEvent<{ value: string }>, caseFilter) => {
      switch (caseFilter) {
        case 'onHand':
          if (event.target.value === '')
            setFilter({ ...filter, onHand: { ...filter.onHand, operator: event.target.value, value: '' } });
          else setFilter({ ...filter, onHand: { ...filter.onHand, operator: event.target.value } });
          break;
        case 'consumptionRate':
          if (event.target.value === '')
            setFilter({
              ...filter,
              consumptionRate: { ...filter.consumptionRate, operator: event.target.value, value: '' },
            });
          else setFilter({ ...filter, consumptionRate: { ...filter.consumptionRate, operator: event.target.value } });
          break;
        case 'expectedReplenishmentStock':
          if (event.target.value === '')
            setFilter({
              ...filter,
              expectedReplenishmentStock: {
                ...filter.expectedReplenishmentStock,
                operator: event.target.value,
                value: '',
              },
            });
          else
            setFilter({
              ...filter,
              expectedReplenishmentStock: { ...filter.expectedReplenishmentStock, operator: event.target.value },
            });
          break;
        case 'expectedReorderDate':
          if (event.target.value === '')
            setFilter({
              ...filter,
              expectedReorderDate: { ...filter.expectedReorderDate, operator: event.target.value, value: null },
            });
          else
            setFilter({
              ...filter,
              expectedReorderDate: { ...filter.expectedReorderDate, operator: event.target.value },
            });
          break;
      }
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, dateValue: Date | null, caseFilter) => {
      const re = /^[0-9\b]+$/;
      switch (caseFilter) {
        case 'brand':
          setFilter({ ...filter, brand: { ...filter.brand, value: event.target.value } });
          break;
        case 'product':
          setFilter({ ...filter, product: { ...filter.product, value: event.target.value } });
          break;
        case 'sku':
          setFilter({ ...filter, sku: { ...filter.sku, value: event.target.value } });
          break;
        case 'onHand':
          if (event.target.value === '' || (re.test(event.target.value) && event.target.value[0] !== '0')) {
            setFilter({ ...filter, onHand: { ...filter.onHand, value: event.target.value } });
          }
          break;
        case 'consumptionRate':
          if (event.target.value === '' || (re.test(event.target.value) && event.target.value[0] !== '0')) {
            setFilter({ ...filter, consumptionRate: { ...filter.consumptionRate, value: event.target.value } });
          }
          break;
        case 'expectedReplenishmentStock':
          if (event.target.value === '' || (re.test(event.target.value) && event.target.value[0] !== '0')) {
            setFilter({
              ...filter,
              expectedReplenishmentStock: { ...filter.expectedReplenishmentStock, value: event.target.value },
            });
          }
          break;
        case 'expectedReorderDate':
          setFilter({ ...filter, expectedReorderDate: { ...filter.expectedReorderDate, value: dateValue } });
          break;
      }
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setFilter({ ...tempFilter });
    };

    const filterSubmit = () => {
      const filters = {
        brand: filter.brand.value,
        product: filter.product.value,
        sku: filter.sku.value,
        on_hand: filter.onHand,
        consumption_rate: filter.consumptionRate,
        expected_replenishment_stock: filter.expectedReplenishmentStock,
        expected_reorder_date: filter.expectedReorderDate,
      };

      updateDataCallback(1, pagination.currentRowPerPage, filters);
      setTempFilter({ ...filter });
      handleMenuClose();
      localStorage.setItem('filter', JSON.stringify({ ...filter }));
    };

    const resetFilter = () => {
      setTempFilter({ ...filterDefault });
      const filters = {
        brand: filterDefault.brand.value,
        product: filterDefault.product.value,
        sku: filterDefault.sku.value,
        on_hand: filterDefault.onHand,
        consumption_rate: filterDefault.consumptionRate,
        expected_replenishment_stock: filterDefault.expectedReplenishmentStock,
        expected_reorder_date: filterDefault.expectedReorderDate,
      };
      updateDataCallback(1, pagination.currentRowPerPage, filters);
      handleMenuClose();
      localStorage.setItem('filter', JSON.stringify({ ...filterDefault }));
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        id="filter-reports"
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={classes.filterBox}>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Box className={classes.filterTitle}>
              <h2>Filter Table Data</h2>
            </Box>
            <Box width="20%">
              <Button color="primary" onClick={resetFilter}>
                Reset
              </Button>
            </Box>
            <Box display="flex" justifyContent="right" width="60%" margin="-30px 0px 0 0">
              <Tooltip title="close" placement="bottom-start">
                <IconButton
                  aria-label="close"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClose}
                >
                  <CloseIcon style={{ color: '#757575' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box className={classes.filterBoxMain}>
            <Grid container className={classes.gridFilterBoxMain}>
              <Grid item className={classes.filterMain} style={{ marginBottom: '30px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>Brand:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-brand"
                          value={filter.brand.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'brand')}
                          placeholder="Epson"
                          variant="outlined"
                          className={classes.textField70}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '30px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>Product:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-product"
                          value={filter.product.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'product')}
                          placeholder="Printer"
                          variant="outlined"
                          className={classes.textField70}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '15px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>SKU:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-sku"
                          value={filter.sku.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'sku')}
                          placeholder="#E-123"
                          variant="outlined"
                          className={classes.textField70}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '15px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>On-Hand:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-select-on-hand"
                          select
                          value={filter.onHand.operator}
                          onChange={(event: any) => handleChange(event, 'onHand')}
                          variant="outlined"
                        >
                          {operatorList.map((option, index) => (
                            <MenuItem key={`onHand-select-${index + 1}`} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="outlined-onHand"
                          value={filter.onHand.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'onHand')}
                          placeholder="> 45"
                          variant="outlined"
                          className={classes.textField30}
                        />
                        <Box style={{ marginLeft: '10px' }}>
                          <h3>Units</h3>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '15px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>Consumption Rate:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-select-consumption-rate"
                          select
                          value={filter.consumptionRate.operator}
                          onChange={(event: any) => handleChange(event, 'consumptionRate')}
                          variant="outlined"
                        >
                          {operatorList.map((option, index) => (
                            <MenuItem key={`consumptionRate-select-${index + 1}`} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="outlined-consumptionRate"
                          value={filter.consumptionRate.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'consumptionRate')}
                          placeholder="> 45"
                          variant="outlined"
                          className={classes.textField30}
                        />
                        <Box style={{ marginLeft: '10px' }}>
                          <h3>Units/Day</h3>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '15px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>Expected Replenishment Stock:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-select-expected-replenishment-stock"
                          select
                          value={filter.expectedReplenishmentStock.operator}
                          onChange={(event: any) => handleChange(event, 'expectedReplenishmentStock')}
                          variant="outlined"
                        >
                          {operatorList.map((option, index) => (
                            <MenuItem key={`expectedReplenishmentStock-select-${index + 1}`} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="outlined-expectedReplenishmentStock"
                          value={filter.expectedReplenishmentStock.value}
                          onChange={(event: any) => handleValueChange(event, new Date(), 'expectedReplenishmentStock')}
                          placeholder="> 45"
                          variant="outlined"
                          className={classes.textField30}
                        />
                        <Box style={{ marginLeft: '10px' }}>
                          <h3>Units</h3>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.filterMain} style={{ marginBottom: '15px' }}>
                <Box width="100%" height="100%" display="flex" justifyContent="left" alignItems="center">
                  <Grid container>
                    <Grid item className={classes.filterLeft}>
                      <Box style={{ marginRight: '10px' }}>
                        <h3>Expected Reorder Date:</h3>
                      </Box>
                    </Grid>
                    <Grid item className={classes.filterRight}>
                      <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <TextField
                          id="outlined-select-expected-reorder-date"
                          select
                          value={filter.expectedReorderDate.operator}
                          onChange={(event: any) => handleChange(event, 'expectedReorderDate')}
                          variant="outlined"
                        >
                          {operatorList.map((option, index) => (
                            <MenuItem key={`expectedReorderDate-select-${index + 1}`} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Box className={classes.datePicker}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={filter.expectedReorderDate.value}
                              onChange={(date: any) => handleValueChange(date, date, 'expectedReorderDate')}
                              placeholder="mm/dd/yyyy"
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              style={{ width: '100%' }}
                            />
                          </MuiPickersUtilsProvider>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box padding="16px">
            <Button variant="contained" className={classes.applyB} onClick={filterSubmit}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Menu>
    );
    return (
      <>
        <Tooltip title="Filter Data" placement="bottom-start">
          <IconButton
            aria-label="filter"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <FilterListIcon style={{ color: '#757575' }} />
          </IconButton>
        </Tooltip>
        {renderMenu}
      </>
    );
  };

  const onRowsClick = (rowData: string[], rowMeta: { dataIndex: number; rowIndex: number }) => {
    const description = { ...reportTableData[rowMeta.dataIndex].description };
    router.push({
      pathname: `/inventory-forecasting/dashboards/${description.brand}/${description.product_name}/${description.sku}`,
    });
  };

  const backToHome = () => {
    localStorage.setItem('filter', JSON.stringify({ ...filterDefault }));
    localStorage.setItem('current_page', JSON.stringify(1));
    localStorage.setItem('rows_perpage', JSON.stringify(15));
    router.push({
      pathname: '/inventory-forecasting/totalOrder',
    });
  };

  const handleClearAll = (funcSet: any, listOfFilter: IItemList[]) => {
    var temp = listOfFilter;
    temp.forEach((item) => (item.selectItem = false));
    funcSet([...temp]);
  };

  const handleSelectAll = (funcSet: any, listOfFilter: IItemList[]) => {
    var temp = listOfFilter;
    temp.forEach((item) => (item.selectItem = true));
    funcSet([...temp]);
  };

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    funcSet: any,
    listOfFilter: IItemList[],
    index: number
  ) => {
    var temp = listOfFilter;
    temp[index] = { ...temp[index], selectItem: event.target.checked };
    funcSet([...temp]);
  };

  const handleExpandChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const resetData = () => {
    setStartEndDate({ startDate: trendDataIn.start_date, EndDate: trendDataIn.end_date });
    const count: number[] = [];
    setDisbleButton(true);
    setLoadingChart({
      lTrend: true,
      lStore: true,
      lGroup: true,
      lClass: true,
      lBrand: true,
    });
    setTrendDataIn({ ...trendDataIn, data: [] });
    setStoreDataIn([]);
    setGroupDataIn([]);
    setClassChartDataIn([]);
    setBrandDataIn([]);
  };

  const getData = async (startDate: Date, endDate: Date, filterList: IFilterListAll, is_predict: boolean) => {
    setFilterList(filterList);
    setStartEndDate({ startDate: startDate, EndDate: endDate });
    const count: number[] = [];
    setDisbleButton(true);
    setLoadingChart({
      lTrend: true,
      lStore: true,
      lGroup: true,
      lClass: true,
      lBrand: true,
    });
    setTrendDataIn({ ...trendDataIn, data: [] });
    setStoreDataIn([]);
    setGroupDataIn([]);
    setClassChartDataIn([]);
    setBrandDataIn([]);
  };

  const LayoutChild = () => {
    return (
      <>
        <BackButton callback={backToHome} text={`Back To Home Page`} />
        <Box padding="10px 15px" color="#757575" fontSize={16} fontWeight="500">
          <h6 style={{ margin: 0, paddingBottom: '15px' }}>MAIN NEVIGATION</h6>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            padding="7.5px 15px"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push({ pathname: `/inventory-forecasting/dashboradsAll` });
            }}
          >
            <DashboardIcon style={{ color: '#757575' }} />
            <Box style={{ marginLeft: '10px' }}>Dashboard</Box>
          </Box>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            padding="7.5px 15px"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push({
                pathname: `/inventory-forecasting/reports`,
              });
            }}
          >
            <TableChartIcon style={{ color: '#757575' }} />
            <Box style={{ marginLeft: '10px' }}>All Product Report</Box>
          </Box>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            padding="7.5px 15px"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push({ pathname: `/inventory-forecasting/forecastReport` });
            }}
          >
            <TableChartIcon style={{ color: '#757575' }} />
            <Box style={{ marginLeft: '10px' }}>Forecast Report</Box>
          </Box>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            padding="7.5px 15px"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push({ pathname: `/inventory-forecasting/totalOrder` });
            }}
          >
            <TableChartIcon style={{ color: '#757575' }} />
            <Box style={{ marginLeft: '10px' }}>Total Order</Box>
          </Box>
        </Box>
      </>
    );
  };

  const getMuiTheme = () =>
    (createTheme as any)({
      overrides: {
        MUIDataTable: {
          responsiveScroll: {
            maxHeight: 'none !important',
            height: 'calc(100vh - 240px) !important',
          },
        },
      },
    });

  const handleAnchorElClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemFiledClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setItemField(event.currentTarget);
  };

  const handleAnchorElClose = (type) => {
    // switch (type) {
    //   case "xlsx":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   case "csv":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   case "pdf":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   default:
    //     break
    // }
    setAnchorEl(null);
  };

  const handleItemFiledClose = (type) => {
    // switch (type) {
    //   case "xlsx":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   case "csv":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   case "pdf":
    //     downloadFile(`/download_${titleTableName}_${type}`, `${type}_${Date.now()}.${type}`)
    //     break
    //   default:
    //     break
    // }
    setItemField(null);
  };

  const handleCloseFilter = () => {
    setPersonName(options)
    setItemField(null);
  }

  const handleChangeField = (event) => {
    const value = event;
    const filterData = personName && personName.filter(item => { return item === value})
    if(_.size(filterData) ){
      const filterName = personName &&  personName.filter(item => { return item !== value})
      setPersonName(filterName)
    }else {
    const valueChange = typeof value === 'string' ? value.split(',') : value
  setPersonName(valueChange.concat(personName))
    }
  };

  const handleClickSubmit = () => {
    const mapPerson = personName && personName.map(item => {
      return {
        label:item
      }
    })
    const intersaction = _.intersectionBy(columns,mapPerson,'label')
    //-------เพิ่ม columns อันที่ไม่อยากให้หาย -------
    const defaultColumns = [
      {
        name: 'description',
        label: 'CM P/N',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => {
            return (
              <Typography component={'span'} noWrap={false}>
                <span>SKU </span>
                <span style={{ fontWeight: 'bold' }}>#E-</span>
                <span style={{fontWeight:'bold'}}>{_.get(value,'sku')}</span>
              </Typography>
            );
          },
        },
        value: 'CM P/N',
      }
    ]

    setColumnNew(defaultColumns.concat(intersaction))
    setItemField(null);
  }

  const resetFilter1 = () => {
    setTempFilter({ ...filterDefault });
    localStorage.setItem('filter', JSON.stringify({ ...filterDefault }));
  };
  return (
    <Layout
      defaultDrawer={true}
      setDrawer={setDrawer}
      title="Dashboard Overview"
      tabChildren={
      <BackButton
      callback={backToHome}
      text={'Back To Home Page'}
    />
    }
  >
      <TableData
        title={'History'}
        TableDataList={reportTableData}
        columns={columnNew}
        HeaderElements={HeaderElements}
        pagination={pagination}
        tableActionUpdate={tableActionUpdate}
        Filters={tempFilter}
        getMuiTheme={getMuiTheme}
        tableId="inventory-reports"
      />
    </Layout>
  );
};

export default reports;
