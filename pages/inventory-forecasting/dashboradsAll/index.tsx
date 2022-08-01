import { Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BackButton from '@components/BackButton'
import Layout from '@componentsShare/Layout'
import { DashboardInventoryFilter, InventoryDashboardAll } from '@components/Component'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios, { AxiosResponse } from 'axios'

const filterDefault = {
    brand: {
      value: ''
    },
    product: {
      value: ''
    },
    sku: {
      value: ''
    },
    onHand: {
      value: '',
      operator: ''
    },
    consumptionRate: {
      value: '',
      operator: ''
    },
    expectedReplenishmentStock: {
      value: '',
      operator: ''
    },
    expectedReorderDate: {
      value: null,
      operator: ''
    }
  }


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
    start_date: Date,
    end_date: Date,
    data: ITrendData[]
  }
  
  interface IItemList {
    selectItem: boolean
    name: string
  }
  
  interface ILoading {
    lTrend: boolean
    lStore: boolean
    lGroup: boolean
    lClass: boolean
    lBrand: boolean
  }
  
  interface IFilterListAll {
    store: IItemList[]
    group: IItemList[]
    classList: IItemList[]
    brand: IItemList[]
    product: IItemList[]
  }

  export const getServerSideProps: GetServerSideProps = async () => {
    const trendApiRes: AxiosResponse<ITrendDataAll> = await axios.post(`http://localhost:8000/get_trend_graph`, {}).then((res) => res)
    const storeApiRes: AxiosResponse<IStoreData[]> = await axios.post(`http://localhost:8000/get_sales_by_store_graph`, {}).then((res) => res)
    const groupApiRes: AxiosResponse<IGroupData[]> = await axios.post(`http://localhost:8000/get_market_share_by_group_graph`, {}).then((res) => res)
    const classChartApiRes: AxiosResponse<IClassChartData[]> = await axios.post(`http://localhost:8000/get_sales_amt_by_class_graph`, {}).then((res) => res)
    const brandApiRes: AxiosResponse<IBrandData[]> = await axios.post(`http://localhost:8000/get_sales_amt_by_brand_graph`, {}).then((res) => res)
    const filterApiRes: AxiosResponse<IBrandData[]> = await axios.post(`http://localhost:8000/get_all_filter_list`, {}).then((res) => res)
  
    return {
      props: {
        trendData: trendApiRes.data,
        storeData: storeApiRes.data,
        groupData: groupApiRes.data,
        classChartData: classChartApiRes.data,
        brandData: brandApiRes.data,
        filterApiRes: filterApiRes.data
      }
    }
  }

const dashboardAll = ({ trendData, storeData, groupData, classChartData, brandData, filterApiRes }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [trendDataIn, setTrendDataIn] = useState<ITrendDataAll>(trendData)
    const [storeDataIn, setStoreDataIn] = useState<IStoreData[]>(storeData)
    const [groupDataIn, setGroupDataIn] = useState<IGroupData[]>(groupData)
    const [classChartDataIn, setClassChartDataIn] = useState<IClassChartData[]>(classChartData)
    const [brandDataIn, setBrandDataIn] = useState<IBrandData[]>(brandData)
    const [startEndDate, setStartEndDate] = useState({ startDate: trendDataIn.start_date, EndDate: trendDataIn.end_date })
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
    const [filterList, setFilterList] = useState<IFilterListAll>(filterApiRes)
    const [disbleButton, setDisbleButton] = useState<boolean>(false)
    const [loadingChart, setLoadingChart] = useState<ILoading>({
      lTrend: false,
      lStore: false,
      lGroup: false,
      lClass: false,
      lBrand: false
    })
    const [isPredict, setisPredict] = useState<boolean>(false)
    const setDrawer = (open: boolean) => {
        setDrawerOpen(open)
      }
      const resetData = () => {
        setisPredict(false)
        setStartEndDate({ startDate: trendDataIn.start_date, EndDate: trendDataIn.end_date })
        const count: number[] = []
        setDisbleButton(true)
        setLoadingChart({
          lTrend: true,
          lStore: true,
          lGroup: true,
          lClass: true,
          lBrand: true
        })
        setTrendDataIn({ ...trendDataIn, data: [] })
        setStoreDataIn([])
        setGroupDataIn([])
        setClassChartDataIn([])
        setBrandDataIn([])
    
        axios.post(`http://localhost:8000/get_trend_graph`, {})
          .then(function (res) {
            // handle success
            const trendRes = res.data
            setTrendDataIn(trendRes)
            setStartEndDate({ startDate: trendRes.start_date, EndDate: trendRes.end_date })
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lTrend: false })
          })
    
        axios.post(`http://localhost:8000/get_sales_by_store_graph`, {})
          .then(function (res) {
            // handle success
            const storeRes = res.data
            setStoreDataIn(storeRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lStore: false })
          })
    
        axios.post(`http://localhost:8080/get_market_share_by_group_graph`, {})
          .then(function (res) {
            // handle success
            const groupRes = res.data
            setGroupDataIn(groupRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lGroup: false })
          })
    
        axios.post(`http://localhost:8000/get_sales_amt_by_class_graph`, {})
          .then(function (res) {
            // handle success
            const chartRes = res.data
            setClassChartDataIn(chartRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lClass: false })
          })
    
        axios.post(`http://localhost:8080/get_sales_amt_by_brand_graph`, {})
          .then(function (res) {
            // handle success
            const brandRes = res.data
            setBrandDataIn(brandRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lBrand: false })
          })
    
        axios.post(`http://localhost:8000/get_all_filter_list`, {})
          .then(function (res) {
            // handle success
            const filter_list = res.data
            setFilterList(filter_list)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
    
          })
      }

      const getData = async (startDate: Date, endDate: Date, filterList: IFilterListAll, is_predict: boolean) => {
        setFilterList(filterList)
        setisPredict(is_predict)
        setStartEndDate({ startDate: startDate, EndDate: endDate })
        const count: number[] = []
        setDisbleButton(true)
        setLoadingChart({
          lTrend: true,
          lStore: true,
          lGroup: true,
          lClass: true,
          lBrand: true
        })
        setTrendDataIn({ ...trendDataIn, data: [] })
        setStoreDataIn([])
        setGroupDataIn([])
        setClassChartDataIn([])
        setBrandDataIn([])
    
        const body = {
          start_date: startDate,
          end_date: endDate,
          filter_list: filterList,
          is_predict: is_predict
        }
        axios.post(`http://localhost:8000/get_trend_graph`, body)
          .then(function (res) {
            // handle success
            const trendRes = res.data
            setTrendDataIn(trendRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lTrend: false })
          })
    
        axios.post(`http://localhost:8000/get_sales_by_store_graph`, body)
          .then(function (res) {
            // handle success
            const storeRes = res.data
            setStoreDataIn(storeRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lStore: false })
          })
    
        axios.post(`http://localhost:8000/get_market_share_by_group_graph`, body)
          .then(function (res) {
            // handle success
            const groupRes = res.data
            setGroupDataIn(groupRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
              setLoadingChart({ ...loadingChart, lGroup: false })
            }
          })
    
        axios.post(`http://localhost:8000/get_sales_amt_by_class_graph`, body)
          .then(function (res) {
            // handle success
            const chartRes = res.data
            setClassChartDataIn(chartRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lClass: false })
          })
    
        axios.post(`http://localhost:8000/get_sales_amt_by_brand_graph`, body)
          .then(function (res) {
            // handle success
            const brandRes = res.data
            setBrandDataIn(brandRes)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
            count.push(1)
            if (count.length === 5) {
              setDisbleButton(false)
            }
            setLoadingChart({ ...loadingChart, lBrand: false })
          })
      }

    return(
        <Layout
        defaultDrawer={true}
        setDrawer={setDrawer}
        title="Inventory"
        tabChildren={
            <DashboardInventoryFilter
                startDate={startEndDate.startDate}
                endDate={startEndDate.EndDate}
                resetFunc={resetData}
                getData={getData}
                disbleButton={disbleButton}
                filterList={filterList}
            />
        }
    >
        <InventoryDashboardAll/>
    </Layout>
    )
}

export default dashboardAll