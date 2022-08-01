import { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { InventoryDashboards, DashboardInventoryFilter, BackButton } from '@components/Component'
import { Layout } from '@componentsShare/Component'
import axios, { AxiosResponse } from "axios"
import { useRouter } from 'next/router'

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

interface IItemList {
  selectItem: boolean
  name: string
}

interface IFilterList {
  store: string
  group: string
  brand: string
  product: string
  sku: string
}

interface IDefaultFilter {
  product: string
  brand: string
  sku: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const graphApiRes: AxiosResponse<IAllGraphData> = (await axios.get(`http://localhost:8000/get_inventory_graph`, { params: { brand: ctx.query.brand, product: ctx.query.product, sku: ctx.query.sku } }).then((res) => res)).data
  const propertiesRes: AxiosResponse<IProperties[]> = await axios.get(`http://localhost:8000/get_inventory_properties`, { params: { brand: ctx.query.brand, product: ctx.query.product, sku: ctx.query.sku } }).then((res) => res)
  const filterRes: AxiosResponse<object> = await axios.get(`http://localhost:8000/get_all_filter_list_inventory`).then((res) => res)
  return {
    props: {
      graphData: graphApiRes,
      propertiesData: propertiesRes.data,
      filterDataList: filterRes.data
    }
  }
}

const inventoryForecasting = ({ graphData, propertiesData, filterDataList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [graphDataIn, setGraphDataIn] = useState<IAllGraphData>(graphData)
  const [propertiesDataIn, setPropertiesDataIn] = useState<IProperties>(propertiesData)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [loadingChart, setLoadingChart] = useState<boolean>(false)
  const [disbleButton, setDisbleButton] = useState<boolean>(false)
  const [defaultFilter, setDefaultFilter] = useState<IDefaultFilter>({
    product: graphData.product,
    brand: graphData.brand,
    sku: graphData.sku
  })
  const [filterDataListIn, setFilterDataListIn] = useState<object>(filterDataList)
  const setDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  useEffect(() => {
    setDisbleButton(true)
    setLoadingChart(true)
    const brandP = `${router.query.brand}`
    const productP = `${router.query.product}`
    const skuP = `${router.query.sku}`
    const storeP = `${router.query.sku}`
    const groupP = `${router.query.sku}`
    const filterListP: IFilterList = {
      store: storeP,
      group: groupP,
      brand: brandP,
      product: productP,
      sku: skuP,
    }
    setDefaultFilter(filterListP)
    getData(filterListP)
  }, [router.asPath]);

  const fetchData = async (filterList: IFilterList) => {
    const pathName = `/inventory-forecasting/dashboards/${filterList.brand}/${filterList.product}/${filterList.sku}`
    if (pathName === router.asPath) return
    setDisbleButton(true)
    setLoadingChart(true)
    console.info()
    router.push({
      pathname: pathName
    })
  }
  
  const getData = async (filterList: IFilterList) => {
    let count: number[] = []
    setGraphDataIn({ ...graphDataIn, data: [] })

    axios.get(`http://localhost:8000/get_inventory_graph`, { params: { brand: filterList.brand, product: filterList.product, sku: filterList.sku } })
      .then(function (res) {
        // handle success
        const graphRes = res.data
        setGraphDataIn(graphRes)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
        count.push(1)
        if (count.length === 3) setDisbleButton(false)
        setLoadingChart(false)
      })

    axios.get(`http://localhost:8000/get_inventory_properties`, { params: { brand: filterList.brand, product: filterList.product, sku: filterList.sku } })
      .then(function (res) {
        // handle success
        const propertiesRes = res.data
        setPropertiesDataIn(propertiesRes)
        setDefaultFilter({
          brand: propertiesRes.brand,
          product: propertiesRes.product,
          sku: propertiesRes.sku
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
        count.push(1)
        if (count.length === 3) setDisbleButton(false)
        setLoadingChart(false)
      })

    axios.get(`http://localhost:8000/get_all_filter_list_inventory`)
      .then(function (res) {
        // handle success
        const filterListRes = res.data
        setFilterDataListIn(filterListRes)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
        count.push(1)
        if (count.length === 3) setDisbleButton(false)
        setLoadingChart(false)
      })
  }

  const backToHome = () => {
    router.push({
      pathname: '/inventory-forecasting/forecastReport'
    })
  }

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
      <InventoryDashboards
        drawerOpen={drawerOpen}
        graphData={graphDataIn}
        loadingChart={loadingChart}
        propertiesData={propertiesDataIn}
      />
    </Layout>
  )
}

export default inventoryForecasting
