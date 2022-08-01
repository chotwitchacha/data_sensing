import React from 'react'
import dayjs from 'dayjs'
import { Typography } from '@material-ui/core'
import { REPRESENT_DATETIME_DATA, REPRESENT_DATETIME_DATA_BE } from 'utility/shareVariable'

export default function RepresentDateTime({values, align}) {
  let dateTimeValue = ''
  let default_format = dayjs.locale() == 'th' ? REPRESENT_DATETIME_DATA_BE : REPRESENT_DATETIME_DATA

  if (dayjs(values).isValid()){ dateTimeValue = dayjs(values).format(default_format) }
  return (
    <Typography align={align || 'left'} color='inherit'>
      {dateTimeValue}
    </Typography>
  )
}
