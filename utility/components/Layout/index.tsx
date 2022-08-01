import { useState, useEffect, useRef } from 'react'
import { Typography, Toolbar, Box, AppBar, IconButton, Select, MenuItem, Tooltip, Drawer, Divider, TextField, Button, Checkbox } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu'
import { useStyles } from './Layout.style'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import clsx from 'clsx'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useOnClickOutside } from "@helper/helper"

import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import Moment from 'moment'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface IItemList {
  selectItem: boolean
  name: string
}

interface IFilterListAll {
  store: IItemList[]
  group: IItemList[]
  classList: IItemList[]
  brand: IItemList[]
  product: IItemList[]
}

interface ISearchFilter {
  storeValue: string
  groupValue: string
  classListValue: string
  brandValue: string
  productValue: string
}

interface IPropsLayout {
  setDrawer: any
  children: any
  title: string
  tabChildren: any
  isHomePage?: boolean
  defaultDrawer: boolean
}

const Layout = ({ setDrawer, children, title, tabChildren, isHomePage, defaultDrawer }: IPropsLayout) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(defaultDrawer)


  const handleDrawerOpen = () => {
    setOpen(true)
    setDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
    setDrawer(false)
  }

  
  if (isHomePage) {
    return (
      <>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: false,
          },
            classes.appBarMain,
          )}
        >
          <Toolbar>
            <img src="/AIF_Purple_noncrop.png" alt="logo" style={{ width: 52, height: 52 }} />
            <Typography
              variant="h6"
              className={classes.textMain}
              noWrap
            >
              Data Sensing System
            </Typography>
            <Typography className={classes.tab} />
            <Tooltip title={'vp_user001' || ''} placement="bottom-start">
              <div className={classes.divUser}><Typography className={classes.username} color="secondary"> {'vp_user001'} </Typography></div>
            </Tooltip>
            <Select className={classes.normalText}
              value="en"
            >
              <MenuItem value={'th'} className={classes.normalText}>TH</MenuItem>
              <MenuItem value={'en'} className={classes.normalText}>EN</MenuItem>
            </Select>
            <IconButton aria-label="display more actions" edge="end" style={{ color: "#757575" }}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box style={{marginTop: '32px'}}>
          {children}
        </Box>
      </>
    )
  } else {
    return (
      <Box className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          },
            classes.appBarMain,
          )}
        >
          <Toolbar>
            <Tooltip title="Filter Mode" placement="bottom-start">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon style={{ color: "#757575" }} />
              </IconButton>
            </Tooltip>
            <img src="/AIF_Purple_noncrop.png" alt="logo" style={{ width: 52, height: 52 }} />
            <Typography
              variant="h6"
              className={classes.textMain}
              noWrap
            >
              Data Sensing System
            </Typography>
            <Typography className={classes.tab} />
            <Tooltip title={'vp_user001' || ''} placement="bottom-start">
              <div className={classes.divUser}><Typography className={classes.username} color="secondary"> {'vp_user001'} </Typography></div>
            </Tooltip>
            <Select className={classes.normalText}
              value="en"
            >
              <MenuItem value={'th'} className={classes.normalText}>TH</MenuItem>
              <MenuItem value={'en'} className={classes.normalText}>EN</MenuItem>
            </Select>
            <IconButton aria-label="display more actions" edge="end" style={{ color: "#757575" }}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Box className={classes.drawerHeader}>
            <Typography variant="h6" style={{ position: 'absolute', left: '15px' }}>
              {title}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
          <Divider />
          {tabChildren}
        </Drawer >
        <Box className={open ? classes.mobileCover : ''}></Box>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Box className={clsx(classes.drawerHeader)} />
          {children}
        </main>
      </Box >
    )
  }

}

export default Layout