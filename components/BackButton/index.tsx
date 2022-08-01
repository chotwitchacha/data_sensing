import { Box } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useStyles } from './BackButton.style'

interface IPropsFilter {
  callback: any
  text: string
}

const BackButton = ({ callback, text }: IPropsFilter) => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="center"
      className={classes.backToReports}
      onClick={callback}
    >
      <ArrowBackIosIcon width="10px" />
      <Box>
        {text}
      </Box>
    </Box>
  )
}

export default BackButton