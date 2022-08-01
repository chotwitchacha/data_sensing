import React, { useState, createElement, useMemo } from 'react'
import MUIDataTable, { MUIDataTableOptions, TableFilterList } from "mui-datatables";
import { Box, Chip, Typography, Checkbox, Tooltip, IconButton, Button,TableRow, TableCell } from '@material-ui/core'
import { Autorenew as AutorenewIcon, FindInPage as FindInPageIcon } from '@material-ui/icons'
import _compact from 'lodash/compact'
import { PaginateDataType, DataTableType } from 'utility/interface/types'
import styles from './mui_data_table.styles'
import { useTheme } from '@material-ui/core/styles'
import * as Represent from 'utility/components/Representations'
import { capitalizeFirstLetter } from 'utility/utilFunc'
// import * as Filters from './Filters'
import _intersection from 'lodash/intersection'
import dayjs from 'dayjs'
import { DATETIME_DISPLAY_FORMAT } from 'utility/shareVariable'

// const columns = [
//   {
//     name: "name",
//     label: "Name",
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: "company",
//     label: "Company",
//     options: {
//       filter: true,
//       sort: false,
//     }
//   },
//   {
//     name: "city",
//     label: "City",
//     options: {
//       filter: true,
//       sort: false,
//     }
//   },
//   {
//     name: "state",
//     label: "State",
//     options: {
//       filter: true,
//       sort: false,
//     }
//   }
// ];

// const data = [
//   { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//   { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//   { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//   { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
// ];

interface DataTableProp {
  dataTable: DataTableType
  options?: any
  selected: Array<number>
  updateDataCallback: any
  showDetalDataCallback: any
  deleteFitlerCallback: any
  filterSubmitCallback: any
  refreshDataOptions?: any
  paginateData: PaginateDataType
  setSelected: React.Dispatch<React.SetStateAction<any[]>>
}

const DataTable = ({ dataTable, paginateData, options, selected, updateDataCallback, showDetalDataCallback, deleteFitlerCallback, filterSubmitCallback, refreshDataOptions, setSelected }: DataTableProp) => {
  const classes = styles()

  const { columns, data } = dataTable
  const isHaveRecord = data.length > 0 ? true : false  
  const [columnsOptions, setColumnsOptions] = useState<any[]>([])
  
  const theme = useTheme()
  const isSelected = (rowIndex:any) => selected.indexOf(rowIndex) !== -1;
  const customSelectAll = (currentRowsSelected: Array<any>, allRowsSelected: Array<any>, rowsSelected: Array<any>) => {
    if (selected.length > 0 && selected.length < data.length) return setSelected([])
    setSelected(rowsSelected)
  }

  const customFilterDialogFooter = (currentFilterList:any, applyNewFilters:any) => {
    return (
      <div style={{ marginTop: '40px' }}>
        <Button variant="contained" id="submit" onClick={() => handleFilterSubmit(applyNewFilters)}>{'apply_filters'}</Button>
      </div>
    )
  }

  const handleFilterSubmit = (applyFilters:any) => {
    let filterList = applyFilters();
    let queryObject = {}
    columns.forEach((column, index) => {
      if (!filterList[index].every((element:any) => element == undefined )){
        queryObject = {...queryObject, ...generateQueryParam(column.options.type, filterList[index], column.name) }
      }
    })
    queryObject = { ...queryObject, page: 1, limit: paginateData.currentRowPerPage }
    filterSubmitCallback(queryObject)
  };

  const generateQueryParam = (dataType:any, filterValue:any, columnValue:any) => {
    let tempQuery = {}

    switch(dataType) {
      case 'string':
        return { [columnValue] : (filterValue[0]) }
      case 'radio':
        return { [columnValue] : (filterValue[0]) }
      case 'number':
        if (filterValue[0]) {
          tempQuery = { ...tempQuery, [`min_${columnValue}`] : (filterValue[0]) }
        } 
        if (filterValue[1]) {
          tempQuery = { ...tempQuery, [`max_${columnValue}`]: (filterValue[1]) }
        }
        return tempQuery
      case 'date':
        if (filterValue[0]) {
          tempQuery = { ...tempQuery, [`start_${columnValue}`] :  (filterValue[0]) }
        } 
        if (filterValue[1]) {
          tempQuery = { ...tempQuery, [`end_${columnValue}`]: (filterValue[1]) }
        }
        return tempQuery
      case 'datetime':
        if (filterValue[0]) {
          tempQuery = { ...tempQuery, [`start_dt_${columnValue}`] : (filterValue[0]) }
        } 
        if (filterValue[1]) {
          tempQuery = { ...tempQuery, [`end_dt_${columnValue}`]: (filterValue[1]) }
        }
        return tempQuery
    }
  }

  const rowRenderWithIcon = (data:any, dataIndex:any, rowIndex:any) => {
    return (
      <TableRow key={rowIndex} className={rowIndex%2==0 ? classes.tableRowEven : classes.tableRowOdd}>
        <TableCell className={classes.stickyCheckbox} key={`${rowIndex}_checkbox`} padding="checkbox"> 
          <Box display="flex"  style={{ whiteSpace: 'nowrap', overflow: 'hidden'}}>
            <Checkbox 
              color="primary"
              onClick={event => handleCheckboxRow(event, rowIndex)}
              checked={isSelected(rowIndex)}
            />
            {/* <IconButton className={classes.showIcon} id={`edit_data_tables`} data-cy={`edit_data_tables`} onClick={() => showDetalDataCallback(dataIndex)}>
              <FindInPageIcon/>
            </IconButton> */}
          </Box>
        </TableCell>
        {
          data.map((value:any, index:number) => {
            // if (columnsOptions && columnsOptions[index].display == "false") return
            let typeValue:any = capitalizeFirstLetter(columns[index]['options']['type'] || 'String')
            let isSubLabel = columns[index]['subLabelField'] || false

            return (
              <TableCell key={`${rowIndex}_cell_${index}`} className={classes.cellContent}>
                {
                  createElement(
                    Represent[typeValue], 
                    { 
                      values: value,
                      dataIndex: dataIndex, 
                      selectCallback: columns[index]['options']['customCallback'],
                      refreshDataOptions: refreshDataOptions
                    }
                  )
                }
                {
                  isSubLabel &&
                    <Typography className={classes.subLabel}>
                      {dataTable.data[dataIndex][isSubLabel]}
                    </Typography>
                }
              </TableCell>
            )
          })
        }
      </TableRow>
    )
  }

  const handleCheckboxRow = (event:any, rowIndex:any) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(rowIndex);
    let newSelected:any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowIndex);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  const textLabels = {
    body: {
      noMatch: '',
      toolTip: 'sort tooltip',
    },
    pagination: {
      next: 'Next Page',
      previous: 'Previous Page',
      rowsPerPage: 'Rows per page',
      displayRows: '',
      jumpToPage: 'Page'
    },
    toolbar: {
      viewColumns: 'View column',
    },
    filter: {
      title: 'Filters',
      reset: 'Reset',
    },
    viewColumns: {
      title: 'view column title',
      titleAria: "Show/Hide Table Columns",
    },
    selectedRows: {
      text: 'select row text',
      delete: 'select row delete',
    }
  }

  const CustomCheckbox = (props:any) => {
    if ('row-select-header' == props['data-description']) {
      let newProps = Object.assign({}, props);
      
      newProps.indeterminate = selected.length > 0 && selected.length < data.length
      newProps.checked = selected.length ==  data.length
      
      return <Checkbox {...newProps} />
    }

    return <Checkbox {...props} />
  }

  const getTitleValue = (dataType:any, v:any) => {
    switch(dataType) {
      case 'string':
        return v
      case 'image':
        return <img src={v}/>
      case 'radio':
        return v
      case 'number':
        if (v[0] && v[1]) {
          return `${v[0]} - ${v[1]}`
        } else if (v[0]) {
          return `${'min'} ${v[0]}`;
        } else if (v[1]) {
          return `${'max'} ${v[1]}`;
        }
      case 'date':
        if (v[0] && v[1]) {
          return `${v[0]} - ${v[1]}`
        } else if (v[0]) {
          return `${'start'} ${v[0]}`;
        } else if (v[1]) {
          return `${'end'} ${v[1]}`;
        }
      case 'datetime':
        if (v[0] && v[1]) {
          return `${dayjs(v[0]).format(DATETIME_DISPLAY_FORMAT)} - ${dayjs(v[1]).format(DATETIME_DISPLAY_FORMAT)}`
        } else if (v[0]) {
          return `${'start'} ${dayjs(v[0]).format(DATETIME_DISPLAY_FORMAT)}`;
        } else if (v[1]) {
          return `${'end'} ${dayjs(v[1]).format(DATETIME_DISPLAY_FORMAT)}`;
        }
    }
  }

  const CustomChip = ({data, index})=> {
    data = Array.isArray(data) ? data : [data]
    if(_compact(data).length == 0) return <React.Fragment/>
    
    let dataType = columns[index].options['type']
    return (
      <Tooltip title={data}>
        <Chip
          className={classes.filterChip}
          variant= 'outlined'
          onDelete={() => deleteFitlerCallback(index)}
          label={<Box fontWeight={'bold'}>{columns[index]['label']}: <span style={{fontWeight:400}}>{getTitleValue(dataType, data)}</span></Box>}
        />
      </Tooltip>
    )
  }

  const customToolbar = () => {
    return (
      <>
       {  options['refresh'] && 
            <Tooltip title={'refresh_data'}>
              <IconButton onClick={refreshDataOptions['refreshDataCallback']}>
                <AutorenewIcon/>
              </IconButton>
            </Tooltip>
        }
      </>
    )
  }

  const CustomFilterList = (props:any) => {
    return <TableFilterList {...props}  ItemComponent={CustomChip} />;
  }
  
  const setFilterChipProps = (colIndex: number, colName: string, filterValue: string) => {
    return {
      color: 'primary',
      variant: 'outlined',
    };
  }

  return (
    <MUIDataTable
      data={data}
      columns={columns}
      selectableRowsHeader={false}
      components={{
        Checkbox: CustomCheckbox,
        CustomChip: CustomChip,
        TableFilterList: CustomFilterList
      }}
      options={{
        ...options,
        jumpToPage: true,
        rowsPerPageOptions: [15, 30, 50, 100],
        serverSide: true,
        selectableRowsHeader: isHaveRecord ? true : false,
        page: paginateData.currentPage - 1,
        rowsPerPage: paginateData.currentRowPerPage,
        count: paginateData.totalResult,
        textLabels: textLabels,
        rowsSelected: selected,
        customToolbar: customToolbar,
        customFilterDialogFooter: customFilterDialogFooter,
        customRowRender: rowRenderWithIcon,
        onRowSelectionChange: customSelectAll,
        setFilterChipProps: setFilterChipProps,
        onTableChange: (action, tableState) => {
          switch (action) {
            case 'changePage':
              updateDataCallback(tableState.page + 1, tableState.rowsPerPage, true);
              break;
            case 'changeRowsPerPage':
              updateDataCallback(tableState.page + 1, tableState.rowsPerPage, false);
              break;
            case 'viewColumnsChange':
              setColumnsOptions(tableState.columns)
              break;
          }
        }
      }}
    />
  )
}


export default DataTable;