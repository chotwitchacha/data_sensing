import React from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles } from './TableDataHistory.style'
import { TableBody } from "@mui/material";

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
    onRowsClick?: any
    tableActionUpdate: any
    Filters?: any
    getMuiTheme?: any
    tableId: string
    history: any
  }

  const TableDataHistory = ({title, TableDataList, columns, HeaderElements,onRowsClick, pagination, tableActionUpdate, Filters, getMuiTheme, tableId, history}: IPropsTableData) => {
    const classes = useStyles()


    return(
        <>
            <ThemeProvider theme={getMuiTheme}>
                <MUIDataTable
                    title={title}
                    data={TableDataList}
                    columns={columns}
                    history={history}
                   
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
                        onRowsClick: onRowsClick,
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

  export default TableDataHistory