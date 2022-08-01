import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Typography, Box, IconButton, Tooltip, Divider, TextField, Button, Checkbox } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles } from './DashboardFilter.style'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import { useTheme } from '@material-ui/core/styles'
import { useOnClickOutside } from "usehooks-ts"
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import Moment from 'moment'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Switch from '@material-ui/core/Switch'
import { BackButton } from '@components/Component'
import { useRouter } from 'next/router'
import _, { isNull } from 'lodash';

interface IItemList {
  selectItem: boolean
  name: string
}

interface IFilterListAll {
  store: IItemList[]
  group: IItemList[]
  classList: IItemList[]
  brand: IItemList[]
  product: IItemList[]
}

interface ISearchFilter {
  storeValue: string
  groupValue: string
  classListValue: string
  brandValue: string
  productValue: string
}

interface IPropsFilter {
  startDate: Date
  endDate: Date
  resetFunc: () => void
  getData: (startDate: Date, endDate: Date, filterList: IFilterListAll, is_predict: boolean) => void
  disbleButton: boolean,
  filterList: IFilterListAll
}

const DashboardFilter = ({ startDate, endDate, resetFunc, getData, disbleButton, filterList }: IPropsFilter) => {
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const [displayCondition, setDisplayCondition] = useState(false)
  const [dateRangeStr, setDateRangeStr] = useState<string>(Moment(new Date(startDate)).format('MMM D, YYYY') + ' to ' + Moment(new Date(endDate)).format('MMM D, YYYY'))
  const [dateSelection, setdateSelection] = useState({
    selection: {
      startDate: new Date(startDate),
      endDate: addDays(new Date(endDate), 0),
      key: 'selection'
    }
  })
  
  const [storeList, setStoreList] = useState<IItemList[]>(filterList.store)
  const [groupList, setGroupList] = useState<IItemList[]>(filterList.group)
  const [classListList, setClassListList] = useState<IItemList[]>(filterList.classList)
  const [brandList, setBrandList] = useState<IItemList[]>(filterList.brand)
  const [productList, setProductList] = useState<IItemList[]>(filterList.product)
  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    storeValue: '',
    groupValue: '',
    classListValue: '',
    brandValue: '',
    productValue: ''
  })
  const [valueSwitch, setValueSwitch] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<string | false>('0')

  const handleValueSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    getData(dateSelection.selection.startDate, dateSelection.selection.endDate, {
      store: storeList,
      group: groupList,
      classList: classListList,
      brand: brandList,
      product: productList,
    }, event.target.checked)
    setValueSwitch(event.target.checked)
  }

  useEffect(() => {
    setStoreList(filterList.store)
    setGroupList(filterList.group)
    setClassListList(filterList.classList)
    setBrandList(filterList.brand)
    setProductList(filterList.product)
    setSearchFilter({
      storeValue: '',
      groupValue: '',
      classListValue: '',
      brandValue: '',
      productValue: ''
    })
  }, [filterList])

  useEffect(() => {
    setDateRangeStr(Moment(dateSelection.selection.startDate).format('MMM D, YYYY') + ' to ' + Moment(dateSelection.selection.endDate).format('MMM D, YYYY'))
  }, [dateSelection])

  useEffect(() => {
    setdateSelection({
      selection: {
        startDate: new Date(startDate),
        endDate: addDays(new Date(endDate), 0),
        key: 'selection'
      }
    })
  }, [startDate, endDate])

  const squareBoxRef = useRef<HTMLDivElement>(null)

  const clickOutsidehandler = () => {
    setDisplayCondition(false)
  }
  useOnClickOutside(squareBoxRef, clickOutsidehandler)

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>, funcSet: any, listOfFilter: IItemList[], index: number) => {
    var temp = listOfFilter
    temp[index] = { ...temp[index], selectItem: event.target.checked }
    funcSet([...temp])
  }

  const handleClearAll = (funcSet: any, listOfFilter: IItemList[]) => {
    var temp = listOfFilter
    temp.forEach((item) => item.selectItem = false);
    funcSet([...temp])
  }

  const handleSelectAll = (funcSet: any, listOfFilter: IItemList[]) => {
    var temp = listOfFilter
    temp.forEach((item) => item.selectItem = true);
    funcSet([...temp])
  }

  const handleExpandChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const backToHome = () => {
    router.push({
      pathname: '/'
    })
  }

  return (
    <>
      <BackButton
        callback={backToHome}
        text={`Back To Home Page`}
      />
      <Typography style={{ margin: '20px 0 10px 15px', fontWeight: 'bold', color: '#757575' }}>
        Date Range Filter
      </Typography>
      <TextField
        disabled
        id="textfield-daterange"
        label="Select Date Range"
        value={dateRangeStr}
        variant="outlined"
        onClick={() => {
          if (!disbleButton) setDisplayCondition(true)
        }}
        style={{ margin: '0 10px 10px 10px' }}
      />
      <div ref={squareBoxRef} >
        <DateRangePicker
          editableDateInputs={false}
          onChange={item => {
            setdateSelection({ ...dateSelection, ...item })
          }}
          moveRangeOnFirstSelection={false}
          ranges={[dateSelection.selection]}
          className={displayCondition ? 'datestyle' : 'datestyleDisplayNone'}
          direction="horizontal"
          months={2}
          preventSnapRefocus={true}
          rangeColors={["#5D40D2"]}
        />
      </div>
      {/* <Divider /> */}
      <Typography style={{ margin: '20px 0 10px 15px', fontWeight: 'bold', color: '#757575' }}>
        Filter
      </Typography>
      <Box height="calc(100% - 400px)" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Accordion
          expanded={expanded === 'Store'}
          onChange={handleExpandChange('Store')}
          className={classes.AccordionStyle}
          style={{ borderWidth: "1px 0 0 0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Store</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{ display: 'block', padding: '10px 0' }}>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 10px">
                <Box>
                  <Tooltip title="Clear All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="clear data"
                      edge="start"
                      onClick={() => handleClearAll(setStoreList, storeList)}
                    >
                      <ClearAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Select All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="select all data"
                      edge="start"
                      onClick={() => handleSelectAll(setStoreList, storeList)}
                    >
                      <SelectAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>

                </Box>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    fullWidth
                    inputProps={{ height: '30px !important' }}
                    value={searchFilter.storeValue}
                    onChange={e => setSearchFilter({ ...searchFilter, storeValue: e.target.value })}
                  />
                </ThemeProvider>
              </Box>
              <Divider style={{ marginTop: '10px', width: '100%' }} />
              <Box padding="10px" maxHeight="250px" style={{ overflowY: 'auto' }}>
                {storeList.map((store, index) => {
                  if (searchFilter.storeValue === "" || (new RegExp(`^${searchFilter.storeValue.toLowerCase()}`)).test(store.name.toString().toLowerCase())) {
                    return (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding="0 10px"
                        key={`storeList-${index}`}
                      >
                        <Checkbox
                          checked={store.selectItem}
                          onChange={e => { handleCheckBoxChange(e, setStoreList, storeList, index) }}
                          color="primary"
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                        <Box width="90%">{store.name}</Box>
                      </Box>
                    )
                  }
                })}

              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'Group'}
          onChange={handleExpandChange('Group')}
          className={classes.AccordionStyle}
          style={{ borderWidth: "1px 0 0 0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Group</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{ display: 'block', padding: '10px 0' }}>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 10px">
                <Box>
                  <Tooltip title="Clear All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="clear data"
                      edge="start"
                      onClick={() => handleClearAll(setGroupList, groupList)}
                    >
                      <ClearAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Select All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="select all data"
                      edge="start"
                      onClick={() => handleSelectAll(setGroupList, groupList)}
                    >
                      <SelectAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>

                </Box>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    fullWidth
                    inputProps={{ height: '30px !important' }}
                    value={searchFilter.groupValue}
                    onChange={e => setSearchFilter({ ...searchFilter, groupValue: e.target.value })}
                  />
                </ThemeProvider>
              </Box>
              <Divider style={{ marginTop: '10px', width: '100%' }} />
              <Box padding="10px" maxHeight="250px" style={{ overflowY: 'auto' }}>
                {groupList.map((group, index) => {
                  if (searchFilter.groupValue === "" || (new RegExp(`^${searchFilter.groupValue.toLowerCase()}`)).test(group.name.toString().toLowerCase())) {
                    return (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding="0 10px"
                        key={`groupList-${index}`}
                      >
                        <Checkbox
                          checked={group.selectItem}
                          onChange={e => { handleCheckBoxChange(e, setGroupList, groupList, index) }}
                          color="primary"
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                        <Box width="90%">{group.name}</Box>
                      </Box>
                    )
                  }
                })}

              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'Class'}
          onChange={handleExpandChange('Class')}
          className={classes.AccordionStyle}
          style={{ borderWidth: "1px 0 0 0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Class</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{ display: 'block', padding: '10px 0' }}>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 10px">
                <Box>
                  <Tooltip title="Clear All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="clear data"
                      edge="start"
                      onClick={() => handleClearAll(setClassListList, classListList)}
                    >
                      <ClearAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Select All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="select all data"
                      edge="start"
                      onClick={() => handleSelectAll(setClassListList, classListList)}
                    >
                      <SelectAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>

                </Box>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    fullWidth
                    inputProps={{ height: '30px !important' }}
                    value={searchFilter.classListValue}
                    onChange={e => setSearchFilter({ ...searchFilter, classListValue: e.target.value })}
                  />
                </ThemeProvider>
              </Box>
              <Divider style={{ marginTop: '10px', width: '100%' }} />
              <Box padding="10px" maxHeight="250px" style={{ overflowY: 'auto' }}>
                {classListList.map((classList, index) => {
                  if (searchFilter.classListValue === "" || (new RegExp(`^${searchFilter.classListValue.toLowerCase()}`)).test(classList.name.toString().toLowerCase())) {
                    return (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding="0 10px"
                        key={`classListList-${index}`}
                      >
                        <Checkbox
                          checked={classList.selectItem}
                          onChange={e => { handleCheckBoxChange(e, setClassListList, classListList, index) }}
                          color="primary"
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                        <Box width="90%">{classList.name}</Box>
                      </Box>
                    )
                  }
                })}

              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'Brand'}
          onChange={handleExpandChange('Brand')}
          className={classes.AccordionStyle}
          style={{ borderWidth: "1px 0 0 0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Brand</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{ display: 'block', padding: '10px 0' }}>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 10px">
                <Box>
                  <Tooltip title="Clear All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="clear data"
                      edge="start"
                      onClick={() => handleClearAll(setBrandList, brandList)}
                    >
                      <ClearAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Select All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="select all data"
                      edge="start"
                      onClick={() => handleSelectAll(setBrandList, brandList)}
                    >
                      <SelectAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>

                </Box>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    fullWidth
                    inputProps={{ height: '30px !important' }}
                    value={searchFilter.brandValue}
                    onChange={e => setSearchFilter({ ...searchFilter, brandValue: e.target.value })}
                  />
                </ThemeProvider>
              </Box>
              <Divider style={{ marginTop: '10px', width: '100%' }} />
              <Box padding="10px" maxHeight="250px" style={{ overflowY: 'auto' }}>
                {brandList.map((brand, index) => {
                  if (searchFilter.brandValue === "" || (new RegExp(`^${searchFilter.brandValue.toLowerCase()}`)).test(brand.name.toString().toLowerCase())) {
                    return (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding="0 10px"
                        key={`brandList-${index}`}
                      >
                        <Checkbox
                          checked={brand.selectItem}
                          onChange={e => { handleCheckBoxChange(e, setBrandList, brandList, index) }}
                          color="primary"
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                        <Box width="90%">{brand.name}</Box>
                      </Box>
                    )
                  }
                })}

              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'Product'}
          onChange={handleExpandChange('Product')}
          className={classes.AccordionStyle}
          style={{ borderWidth: "1px 0 1px 0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Product</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{ display: 'block', padding: '10px 0' }}>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 10px">
                <Box>
                  <Tooltip title="Clear All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="clear data"
                      edge="start"
                      onClick={() => handleClearAll(setProductList, productList)}
                    >
                      <ClearAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Select All" placement="bottom-start">
                    <IconButton
                      color="inherit"
                      aria-label="select all data"
                      edge="start"
                      onClick={() => handleSelectAll(setProductList, productList)}
                    >
                      <SelectAllIcon style={{ color: "#757575" }} />
                    </IconButton>
                  </Tooltip>

                </Box>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    fullWidth
                    inputProps={{ height: '30px !important' }}
                    value={searchFilter.productValue}
                    onChange={e => setSearchFilter({ ...searchFilter, productValue: e.target.value })}
                  />
                </ThemeProvider>
              </Box>
              <Divider style={{ marginTop: '10px', width: '100%' }} />
              <Box padding="10px" maxHeight="250px" style={{ overflowY: 'auto' }}>
                {productList.map((product, index) => {
                  if (searchFilter.productValue === "" || (new RegExp(`^${searchFilter.productValue.toLowerCase()}`)).test(product.name.toString().toLowerCase())) {
                    return (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        padding="0 10px"
                        key={`productList-${index}`}
                      >
                        <Checkbox
                          checked={product.selectItem}
                          onChange={e => { handleCheckBoxChange(e, setProductList, productList, index) }}
                          color="primary"
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                        <Box width="90%">{product.name}</Box>
                      </Box>
                    )
                  }
                })}

              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* <Divider /> */}
      <Box
        display="flex"
        justifyContent="right"
        alignItems="right"
        width="100%"
        paddingRight="10px"
        marginTop="15px"
        marginBottom="15px"
      >
        <Button
          variant="contained"
          className={disbleButton ? classes.applyBDis : classes.applyB}
          onClick={() => {
            getData(dateSelection.selection.startDate, dateSelection.selection.endDate, {
              store: storeList,
              group: groupList,
              classList: classListList,
              brand: brandList,
              product: productList,
            }, valueSwitch)
          }}
          disabled={disbleButton}
        >
          Apply
        </Button>
        <Button
          variant="contained"
          className={disbleButton ? classes.resetBDis : classes.resetB}
          onClick={() => {
            setExpanded('0')
            resetFunc()
            setValueSwitch(false)
          }}
          disabled={disbleButton}
        >
          Reset
        </Button>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60px"
        width="299px"
        position="fixed"
        bottom="0px"
        // zIndex={100}
        style={{ backgroundColor: '#fff' }}
      >
        <Typography style={disbleButton ? { color: '#00000042' } : {}}>Actual</Typography>
        <Switch
          checked={valueSwitch}
          onChange={handleValueSwitch}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
          disabled={disbleButton}
        />
        <Typography style={disbleButton ? { color: '#00000042' } : {}}>Predict</Typography>
      </Box>
    </>
  )
}

export default DashboardFilter