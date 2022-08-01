import React from 'react'
import { Typography } from '@material-ui/core'

export default function RepresentString({values, align}) {
  return (
    <Typography align={align || 'left'} color='inherit'>{values}</Typography>
  )
}
