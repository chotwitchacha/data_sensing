import React from 'react'
import { Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import { DATETIME_DISPLAY_FORMAT } from 'utility/shareVariable'

export default function RepresentHash({values, align}) {
  
  const renderKeyWithValue = () => {
    let key = Object.keys(values)
    if(key[0].match(/_*\$date/)){
      return dayjs(values[key[0]]).format(DATETIME_DISPLAY_FORMAT)
    }

    return JSON.stringify(values)
  }

  return (
    <Typography align={align || 'left'} color='inherit'>{renderKeyWithValue()}</Typography>
  )
}
