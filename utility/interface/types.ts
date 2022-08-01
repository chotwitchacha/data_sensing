export interface DataTableType {
  primaryFields?: Array<string>
  data: Array<any>
  columns: Array<any>
}

export interface PaginateDataType {
  currentPage: number
  currentRowPerPage: number
  totalPage: number
  totalResult: number
}

export interface MapColumnMuiTable {
  [key: string ]: IColumnTable
}

export interface IColumnTable {
  label: string
  subLabelField?: string
  options?: Object
  customCallback?: any
}