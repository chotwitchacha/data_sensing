import React, { useState, useEffect } from 'react'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const colors = ["#8884d8", "#82ca9d", "#84d8d8", "#ffadad"]

interface IStoreDataActual {
  sales_amt: number
  store: string
}

interface IStoreDataPredict {
  SALES_PREDICT: number
  store: string
}

interface IStoreDataConActual {
  sales_amt: number
  store: string
  fill: string
}

interface IStoreDataConPredict {
  SALES_PREDICT: number
  store: string
  fill: string
}

interface IPropsTrend {
  // parentWidth: number
  data: IStoreDataActual[] | IStoreDataPredict[]
  isPredict: boolean
}

const Store = ({ data, isPredict }: IPropsTrend) => {
  const [dataConvert, setDataConvert] = useState<IStoreDataConActual[] | IStoreDataConPredict[]>()

  useEffect(() => {
    const tempData: any[] = []
    data.forEach((data, index) => {
      tempData.push({ ...data, fill: colors[index] })
    })
    setDataConvert(tempData)
  }, [data])

  const DataFormater = (number: number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B"
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M"
    } else if (number > 1000) {
      return (number / 1000).toString() + "K"
    } else {
      return number.toString()
    }
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart
        layout="vertical"
        data={dataConvert}
        margin={{
          right: 30,
          bottom: 50,
          left: 0
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" tickFormatter={DataFormater} />
        <YAxis dataKey="store" type="category" scale="band" />
        <Tooltip formatter={(value, name) => (name === "price") ? `$${value/100}` : value.toLocaleString()}/>
        <Bar dataKey={isPredict ? 'SALES_PREDICT' : 'sales_amt'} barSize={20} fill="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default Store