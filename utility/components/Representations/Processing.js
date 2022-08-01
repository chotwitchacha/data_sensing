import React from 'react'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function RepresentProcessing({ dataIndex, refreshDataOptions }) {
  const { mapJobWithIndex, jobProcess } = refreshDataOptions
  const { t } = useTranslation()
  const JobStatus = () => {
    let status = undefined

    if (!!mapJobWithIndex[dataIndex]) {
      mapJobWithIndex[dataIndex].forEach((jobId) => {
        status = jobProcess[jobId]
      })
    }

    return (!!status ? < CircularProgress color="secondary"
      size={25}
    /> : 'normal'
    )
  }

  return (
    <Box textAlign="center" >
      <JobStatus />
    </Box>
  )
}