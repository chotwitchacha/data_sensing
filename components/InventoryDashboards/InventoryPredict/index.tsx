import React, { useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
  Scatter,
  ResponsiveContainer
} from "recharts"
import { useStyles } from './InventoryPredict.style'

const dataTemp = [
  {
    day_of_date: "",
    inventory: 0
  },
  {
    day_of_date: "6 ธ.ค. 2564",
    inventory: 2060
  },
  {
    day_of_date: "7 ธ.ค. 2564",
    inventory: 1944
  },
  {
    day_of_date: "8 ธ.ค. 2564",
    inventory: 1837
  },
  {
    day_of_date: "9 ธ.ค. 2564",
    inventory: 1736
  },
  {
    day_of_date: "10 ธ.ค. 2564",
    inventory: 1613
  },
  {
    day_of_date: "11 ธ.ค. 2564",
    inventory: 1547
  },
  {
    day_of_date: "12 ธ.ค. 2564",
    inventory: 1450
  },
  {
    day_of_date: "13 ธ.ค. 2564",
    inventory: 1379
  },
  {
    day_of_date: "14 ธ.ค. 2564",
    inventory: 1293
  },
  {
    day_of_date: "15 ธ.ค. 2564",
    inventory: 1175
  },
  {
    day_of_date: "16 ธ.ค. 2564",
    inventory: 1076
  },
  {
    day_of_date: "17 ธ.ค. 2564",
    inventory: 981
  },
  {
    day_of_date: "18 ธ.ค. 2564",
    inventory: 916
  },
  {
    day_of_date: "19 ธ.ค. 2564",
    inventory: 844
  },
  {
    day_of_date: "20 ธ.ค. 2564",
    inventory: 755
  },
  {
    day_of_date: "21 ธ.ค. 2564",
    inventory: 653
  },
  {
    day_of_date: "22 ธ.ค. 2564",
    inventory: 541
  },
  {
    day_of_date: "23 ธ.ค. 2564",
    inventory: 434
  },
  {
    day_of_date: "24 ธ.ค. 2564",
    inventory: 2060
  },
  {
    day_of_date: "25 ธ.ค. 2564",
    inventory: 1985
  },
  {
    day_of_date: "26 ธ.ค. 2564",
    inventory: 1894
  },
  {
    day_of_date: "27 ธ.ค. 2564",
    inventory: 1812
  },
  {
    day_of_date: "28 ธ.ค. 2564",
    inventory: 1698
  },
  {
    day_of_date: "29 ธ.ค. 2564",
    inventory: 1597
  },
  {
    day_of_date: "30 ธ.ค. 2564",
    inventory: 1477
  },
  {
    day_of_date: "31 ธ.ค. 2564",
    inventory_predict: 1373,
    inventory: 1373
  },
  {
    day_of_date: "1 Jan 2022",
    inventory: 0,
    inventory_predict: 1273,
    sales_predict: 100,
    sales_accumulated_predict: 100
  },
  {
    day_of_date: "2 Jan 2022",
    inventory: 0,
    inventory_predict: 1169,
    sales_predict: 104,
    sales_accumulated_predict: 204
  },
  {
    day_of_date: "3 Jan 2022",
    inventory: 0,
    inventory_predict: 1072,
    sales_predict: 97,
    sales_accumulated_predict: 301
  },
  {
    day_of_date: "4 Jan 2022",
    inventory: 0,
    inventory_predict: 988,
    sales_predict: 84,
    sales_accumulated_predict: 385
  },
  {
    day_of_date: "5 Jan 2022",
    inventory: 0,
    inventory_predict: 883,
    sales_predict: 105,
    sales_accumulated_predict: 490
  },
  {
    day_of_date: "6 Jan 2022",
    inventory: 0,
    inventory_predict: 811,
    sales_predict: 72,
    sales_accumulated_predict: 562
  },
  {
    day_of_date: "7 Jan 2022",
    inventory: 0,
    inventory_predict: 730,
    sales_predict: 81,
    sales_accumulated_predict: 643,
    Reorder_Point: 643,
    z: 250
  },
  {
    day_of_date: "8 Jan 2022",
    inventory: 0,
    inventory_predict: 642,
    sales_predict: 88,
    sales_accumulated_predict: 731
  },
  {
    day_of_date: "9 Jan 2022",
    inventory: 0,
    inventory_predict: 564,
    sales_predict: 78,
    sales_accumulated_predict: 809
  },
  {
    day_of_date: "10 Jan 2022",
    inventory: 0,
    inventory_predict: 470,
    sales_predict: 94,
    sales_accumulated_predict: 903
  },
  {
    day_of_date: "11 Jan 2022",
    inventory: 0,
    inventory_predict: 394,
    sales_predict: 76,
    sales_accumulated_predict: 979
  },
  {
    day_of_date: "12 Jan 2022",
    inventory: 0,
    inventory_predict: 313,
    sales_predict: 81,
    sales_accumulated_predict: 1060
  },
  {
    day_of_date: "13 Jan 2022",
    inventory: 0,
    inventory_predict: 234,
    sales_predict: 79,
    sales_accumulated_predict: 1139
  },
  {
    day_of_date: "14 Jan 2022",
    inventory: 0,
    inventory_predict: 167,
    sales_predict: 67,
    sales_accumulated_predict: 1206
  },
  {
    day_of_date: "15 Jan 2022",
    inventory: 0,
    inventory_predict: 95,
    sales_predict: 75,
    sales_accumulated_predict: 1281,
    Date_of_arrival_point: "95",
    z: 250
  }
]

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

interface IPropsTrend {
  data: IGraphData[]
}

const InventoryPredict = ({ data }: IPropsTrend) => {
  const classes = useStyles()
  const DataFormater = (number: number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };

  // const CustomTooltip = ({
  //   active,
  //   payload,
  //   label,
  // }: any) => {
  //   if (active) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload?.[0].value}`}</p>
  //         <p className="desc">Anything you want can be displayed here.</p>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  return (
    <ResponsiveContainer width="90%" height={400}>
      <ComposedChart
        data={data}
        margin={{
          top: 0,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day_of_date" />
        <YAxis
          tickFormatter={DataFormater}
          type="number"
          label={{
            value: `QTY`,
            angle: -90,
            position: "insideLeft"
          }}
        />

        {/* <Tooltip  content={<CustomTooltip />}/> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="inventory" barSize={40} fill="#8884d8" />
        {/* <Bar dataKey="inventory_predict" barSize={40} fill="#FA8072" /> */}
        {/* <Bar dataKey="sales_predict" barSize={40} fill="#1976D2" /> */}
        <Line
          strokeWidth={5}
          type="monotone"
          dataKey="inventory_predict"
          stroke="#FA8072"
          fill="#FA8072"
        />
        <Line
          strokeWidth={5}
          type="monotone"
          dataKey="sales_predict"
          stroke="#1976D2"
          fill="#1976D2"
        />
        {/* <Line
        strokeWidth={3}
        type="monotone"
        dataKey="sales_accumulated_predict"
        stroke="#77DD77"
        fill="#77DD77"
      /> */}
        <ZAxis type="number" dataKey="z" range={[60, 400]} />
        <Scatter dataKey="Reorder_Point" fill="#FF1818" />
        <Scatter
          name={"Date of arrival point"}
          dataKey="Date_of_arrival_point"
          fill="#007171"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default InventoryPredict