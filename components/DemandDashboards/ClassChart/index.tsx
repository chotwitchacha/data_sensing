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

const colors = ["#8884d8", "#82ca9d", "#84d8d8", "#ffadad", "#dcadff", "#add2ff", "#adffbb", "#ffe2ad", "#d7d884", "#fdff7a"]

interface IClassChartDataActual {
  class: string
  sales_amt: number
}

interface IClassChartDataPredict {
  class: string
  SALES_PREDICT: number
}

interface IPropsTrend {
  // parentWidth: number
  data: IClassChartDataActual[] | IClassChartDataPredict[]
  isPredict: boolean
}

const ClassChart = ({ data, isPredict }: IPropsTrend) => {
  const [dataConvert, setDataConvert] = useState<any[]>()

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
    <ResponsiveContainer width="95%" height={300}>
      <ComposedChart
        layout="vertical"
        data={dataConvert}
        margin={{
          top: 0,
          right: 20,
          bottom: 50,
          left: 30
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" tickFormatter={DataFormater} />
        <YAxis dataKey="class" type="category" scale="band" />
        <Tooltip formatter={(value, name) => (name === "price") ? `$${value/100}` : value.toLocaleString()}/>
        <Bar dataKey={isPredict ? 'SALES_PREDICT' : 'sales_amt'} barSize={20} fill="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ClassChart