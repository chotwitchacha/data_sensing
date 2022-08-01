import React from 'react'
import { Typography } from '@material-ui/core'

export default function RepresentDropdown({values, align}) {
  return (
    <Typography align={align || 'left'} color='inherit'>{values}</Typography>
  )
}
