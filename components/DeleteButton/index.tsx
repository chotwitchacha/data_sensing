import styles from './DeleteButton.styles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Dialog, DialogTitle, DialogActions, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const deleteButton = ({ appStore, itemId, messages, deleteItem, callback, schema, deleteId }: any) => {
  const classes = styles()
  const router = useRouter()
  const [open, setOpen] = useState(false)


  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const deleteFunction = async () =>{
    handleClose()
    const res = await deleteItem(itemId, schema)
    if (res.status == 204) {
      callback(itemId)
    } else if (res.status == 401) {
      router.push(`/project/`)
    } else {
    }
  }

  return (
    <>
      <Tooltip title="Delete" aria-label="save">
        <IconButton id={deleteId} color="inherit" onClick={handleClickOpen}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{messages['dialog']}</DialogTitle>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button id="delete" onClick={deleteFunction} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default deleteButton