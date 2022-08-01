import React from 'react'
import { Typography } from '@material-ui/core'
// import { Decimal } from 'decimal.js'

export default function RepresentNumber({values, align, round_mode}) {

  // const roundingMode = {
  //   up: Decimal.ROUND_UP,
  //   down: Decimal.ROUND_DOWN,
  //   half_up: Decimal.ROUND_HALF_UP,
  //   half_down: Decimal.ROUND_HALF_DOWN,
  //   half_even: Decimal.ROUND_HALF_EVEN,
  //   ceil: Decimal.ROUND_CEIL,
  //   floor: Decimal.ROUND_FLOOR
  // }
  
  return (
    <Typography align={align || 'right'} color='inherit'>{values}</Typography>
  )
}
