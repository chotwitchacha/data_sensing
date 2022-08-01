import React from 'react'
import dayjs from 'dayjs'
import { Typography } from '@material-ui/core'
import { REPRESENT_DATE_DATA, REPRESENT_DATE_DATA_BE } from 'utility/shareVariable'

export default function RepresentDateTime({values, align}) {
  let default_format = dayjs.locale() == 'th' ? REPRESENT_DATE_DATA_BE : REPRESENT_DATE_DATA
  return (
    <Typography align={align || 'left'} color='inherit'>
      { dayjs(values).format(default_format) }
    </Typography>
  )
}
