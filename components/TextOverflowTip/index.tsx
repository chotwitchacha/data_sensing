import React, { useRef, useEffect, useState } from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import styles from './TextOverflowTip.styles'

const OverflowTip = ({ value, width }) => {
  const classes = styles()
  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false)
  // Create Ref
  const textElementRef = useRef()

  const compareSize = () => {
    if (!textElementRef) return

    const current = ((textElementRef || {}).current || {})
    setHover(current['scrollWidth'] > current['clientWidth'])
  }

  // compare once and add resize listener on "componentDidMount"
  useEffect(() => {
    compareSize()
    window.addEventListener('resize', compareSize)
  }, [])

  // remove resize listener again on "componentWillUnmount"
  useEffect(() => () => {
    window.removeEventListener('resize', compareSize)
  }, [])

  return (
    <Tooltip
      title={value}
      interactive
      disableHoverListener={!hoverStatus}
      style={{ width }}
    >
      <Typography
        ref={textElementRef}
        className={classes.ellipsis}
      >
        {value}
      </Typography>
    </Tooltip>
  )
}

export default OverflowTip
