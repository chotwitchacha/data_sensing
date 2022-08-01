import React, { useState, useCallback, useEffect } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts"

const colors = ["#8884d8", "#ffc6ff", "#9bf6ff", "#caffbf", "#ffd6a5", "#ffadad", "#f3722c", "#ff477e", "#0077b6", "#54478c"]

interface IGroupDataActual {
  groups: string
  sales_amt: number
}

interface IGroupDataPredict {
  groups: string
  SALES_PREDICT: number
}

interface IPropsTrend {
  // parentWidth: number,
  data: IGroupDataActual[] | IGroupDataPredict[]
  isPredict: boolean
}

const Group = ({ data, isPredict }: IPropsTrend) => {
  const [dataConvert, setDataConvert] = useState<any[]>([])

  useEffect(() => {
    const tempData:any[] = []
    data.forEach((data, index) => {
      tempData.push({ ...data, fill: colors[index] })
    })
    setDataConvert(tempData)
  }, [data])

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const renderActiveShape = (props: any) => {
    var sumAll = 0
    if (isPredict) {
      sumAll = dataConvert.map(dt => dt.SALES_PREDICT).reduce((acc, vl) => vl + acc)
    } else {
      sumAll = dataConvert.map(dt => dt.sales_amt).reduce((acc, vl) => vl + acc)
    }
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
      <g>
        <text x={cx} y={cy} dy={-16} textAnchor="middle" fill={"#999"}>
          รวม
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#999"}>
          {sumAll.toLocaleString()}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill={"#999"}>
          บาท
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={-18}
          textAnchor={textAnchor}
          fill={fill}
        >
          {payload.groups}<br/>
          </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={fill}
        >
          {`${value.toLocaleString()} บาท`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={fill}
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
    <PieChart
      margin={{
        right: 20,
        bottom: 50,
      }}
    >
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataConvert}
        // cx={260}
        // cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey={isPredict? 'SALES_PREDICT':'sales_amt'}
        onClick={onPieEnter}
      />
    </PieChart>
    </ResponsiveContainer>
  )
}

export default Group