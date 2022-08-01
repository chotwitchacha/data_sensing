import React, { useEffect, useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { useStyles } from './TrendPredict.style'

interface ITrendData {
  sales: number
  date: string
  SALES_PREDICT: number
}

interface IPropsTrend {
  // parentWidth: number,
  data: ITrendData[]
}

const TrendPredict = ({ data }: IPropsTrend) => {
  const classes = useStyles()
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
    
    <ResponsiveContainer width="90%" height={320}>
      <ComposedChart
        id="trend"
        data={data}
        margin={{
          right: 20,
          bottom: 50,
          left: 10
        }}
        className={classes.ChartsTrend}
      >
        {console.log(data)}
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={DataFormater}
          type="number"
          label={{
            value: `จำนวนเงิน`,
            angle: -90,
            position: "insideLeft"
          }}
        />
        <Tooltip formatter={(value, name) => (name === "price") ? `$${value/100}` : value.toLocaleString()} />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
        <Line
          strokeWidth={3}
          type="monotone"
          dataKey="SALES_PREDICT"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TrendPredict