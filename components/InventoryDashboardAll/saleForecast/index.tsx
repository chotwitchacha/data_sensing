import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useStyles } from './saleForecast.style'

const data = [
  { name: "Total Stock", value: 183 },
  { name: "Sale Forecast", value: 90 }
];

const COLORS = ["#C6D2E5", "#002495"];

const per = data.map((item, index) => item.value);

const x = per[1] / per[0];
const z = x * 100;
const y = 100 - x * 100;

const renderCustomizedLabel = () => {
  return (
    <text
      x='253'
      y='100'
      dy={8}
      textAnchor="middle"
      fill='#8884d8'
      fontSize="25"
      fontWeight="700"
    >
      {`${(x * 100).toFixed(2)}%`}
    </text>
  );
};

const a = [{ value: y }, { value: z }];

const saleForecast = () => {
    const classes = useStyles()

    
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={a}
        cx={250}
        cy={100}
        innerRadius={60}
        outerRadius={100}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default saleForecast
