import React from 'react'
import MUIDataTable from "mui-datatables"
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Box, Button, Menu, MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useStyles } from './TableDataForecastinf.style'

const options: any = {
  selectableRows: false,
  viewColumns: false,
  filter: false,
  confirmFilters: false,
  filterType: 'custom',
  sort: false,
  download: false,
  print: false,
  search: false,
  selectToolbarPlacement: 'none',
  responsive: 'scroll',
}

interface IPropsTableData {
  title: any
  TableDataList: any
  columns: any
  HeaderElements: any
  pagination: any
  tableActionUpdate: any
  Filters?: any
  getMuiTheme?: any
  tableId: string
  onRowsClick?: any
}

const TableDataForecasting = ({ title, TableDataList, columns, HeaderElements, pagination,onRowsClick, tableActionUpdate, Filters, getMuiTheme, tableId }: IPropsTableData) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
  }
  const handleAnchorElClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
    <ThemeProvider theme={getMuiTheme}>
      <MUIDataTable
        title={title}
        data={TableDataList}
        columns={columns}
        
        options={{
          ...options,
          tableId: tableId,
          customToolbar: () => (HeaderElements ? <HeaderElements /> : <></>),
          jumpToPage: true,
          rowsPerPageOptions: [15, 30, 50, 100],
          serverSide: true,
          selectableRowsHeader: false,
          page: pagination.currentPage - 1,
          rowsPerPage: pagination.currentRowPerPage,
          count: pagination.totalData,
          onRowClick: onRowsClick,
          onTableChange: (action, tableState) => {
            switch (action) {
              case 'changePage':
                tableActionUpdate(tableState.page + 1, tableState.rowsPerPage, Filters);
                break;
              case 'changeRowsPerPage':
                tableActionUpdate(tableState.page + 1, tableState.rowsPerPage, Filters);
                break;
              case 'viewColumnsChange':
                // console.log(tableState.columns, 'viewColumnsChange')
                // setColumnsOptions(tableState.columns)
                break;
            }
          }
        }}
      />
    </ThemeProvider>
    </>
  )
}

export default TableDataForecasting