import React from 'react'
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';

export default function RepresentRadio({values, selectCallback, dataIndex}) {
  return (
    <Box textAlign="center">
      <Radio
        color="primary"
        id = {`radio_${selectCallback}`}
        data-cy="choose-default-dashboard"
        onClick={() => selectCallback(dataIndex)}
        checked={Boolean(values)}
      />
    </Box>
  )
}