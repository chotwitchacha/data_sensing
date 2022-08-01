import React from 'react'
import { Typography } from '@material-ui/core'

export default function RepresentArray({values, align}) {

  const renderArray = () => {
    let representValues = []

    values.map((value) => {
      let tempValue = null

      switch(value.constructor) {
        case Array:
          tempValue = value.join(',')
          break;
        case Object:
          tempValue = JSON.stringify(value)
          break;
        default:
          tempValue = value.toString()
      }

      representValues.push(tempValue)
    })

    return representValues.join(', ')
  }

  return (
    <Typography align={align || 'left'} color='inherit'>{renderArray()}</Typography>
  )
}
