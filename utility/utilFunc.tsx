
import { 
  emailValidator, passwordValidator, confirmPasswordValidator, 
  formValidator, oldPasswordValidator, userNameValidator, roleValidator,
  createReportValidator, previewValidator, assetValidator, templateValidator,
  userNameLoginValidator, chartSizeValidator, dashboardValidator, panelValidator,
  customLogoAppNameValidator, customLogoTitleValidator, displayNameValidator
} from './validator'

import React, { createElement } from 'react'
import * as Represent from '../utility/components/Representations'
import _isUndefined from 'lodash/isUndefined'

const utilFunc =  {
  validateEmail: (email:any) => {
    return emailValidator(email)
  },
  validatePassword: (password:any) => {
    return passwordValidator(password)
  },
  validateConfirmPassword: (password:any, confirmPassword:any) => {
    return confirmPasswordValidator(password, confirmPassword)
  },
  validateForm: (email:any, password:any, confirmPassword:any) => {
    return formValidator(email, password, confirmPassword)
  },
  validateCreateReport: (name:any, description:any, pipeline:any, charts:any) => {
    return createReportValidator(name, description, pipeline, charts)
  },
  validateOldPassword: (oldPassword:any) => {
    return oldPasswordValidator(oldPassword)
  },
  validateUserName: (name:any) => {
    return userNameValidator(name)
  },
  validateUserNameLogin: (username:any) => {
    return userNameLoginValidator(username)
  },
  validateRole: (roleInput:any, roles:any) => {
    return roleValidator(roleInput, roles)
  },
  validateRunReport: (pipeline:any) => {
    return previewValidator(pipeline)
  },
  validateAssets: (assets:any, mode='new', oldAssetFilename=[]) => {
    return assetValidator(assets, mode, oldAssetFilename)
  },
  validateTemplate: (file:any, name:any, mode='new') => {
    return templateValidator(file, name, mode)
  },
  validateChratSize : (chartData:any) => {
    return chartSizeValidator(chartData)
  },
  validateDashboard : (dashboardName:any) => {
    return dashboardValidator(dashboardName)
  },
  validatePanels : (panelData:any) => {
    return panelValidator(panelData)
  },
  setHeaderAccessToken: (token:any) => {
    return { Authorization: `Bearer ${token}`, withCredentials: true}
  },
  isNumber: (n:any) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n)
  },
  searchByKey: (obj:any, key:any, word:any) => {
    if (!obj) { return }
    if (!Array.isArray(obj)) { obj = Array(obj)}
  
    for (var i in obj) {
      if (obj[i] && obj[i][key] == word) {
        return obj[i];
      }
    }
    return null;
  },
  extractError400: (data:any) => {
    let errorMessages = []
    for(let key in data){
      let message = ''
      message = data[key].join(', ')
      errorMessages.push(message)
    }
    
    return errorMessages
  },
  capitalizeFirstLetter: (str:any) => {
    str = str.replace('_', '')
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  RepresentValue: (values:any) => {
    if(values === undefined || values === '') { return (<></>) }
    else{
      return (
        createElement(
          Represent[utilFunc.capitalizeFirstLetter(typeof(values))], 
          { values: values, align: 'left' })
      )
    }
  },
   validateAppName: (appName:any) => {
     return customLogoAppNameValidator(appName)
  },
   validateTitleName: (titleName:any) => {
     return customLogoTitleValidator(titleName)
  },
  emptyHash: (hash:any) => {
    if (Object.keys(hash).length === 0 && hash.constructor === Object) {return true}
    for(var key of Object.keys(hash)){
      if (hash[key] != ''){
        return false
      }
    }
    return true
  }
}

const extractError400 = (data:any) => {
  let errorMessages = []
  for(let key in data){
    let message = ''
    message = data[key].join(', ')
    errorMessages.push(message)
  }
  
  return errorMessages
}

const filterColumnsResultTable = (allColumns=[]) => {
  let filteredFields:any = []

  allColumns.forEach((value) => {
    filteredFields.push(
      { 
        name : value['_id'], 
        label: value['_id'], 
        options: {
          display: true,
          styles: { textAlign: 'left' }
        }
      }
    )
  })

  return filteredFields
}

const filterColumns = (mapField:any, filterInit:any, isHaveData:any) => {
  let filteredFields:any = []
  Object.keys(mapField).forEach((value) => {
    if (mapField[value] != undefined) {
      filteredFields.push(
        { 
          name : value, 
          label: mapField[value]['label'], 
          subLabelField: mapField[value]['subLabelField'], 
          options: {
            filterType: 'custom', 
            display: isHaveData,
            filterList: filterList(mapField[value]['options']['type'], filterInit, value),
            ...mapField[value]['options'] || {}, 
          }
        }
      )
    }
  })
  return filteredFields
}

const filterList = (type:any, filterInit:any[], column:any) => {
  let tempFilter:any = []
  switch (type) {
    case 'string':
      if (!!filterInit[column]) tempFilter.push(filterInit[column])
      break
    case 'radio':
      if (!!filterInit[column]) tempFilter.push(filterInit[column])
      break
    case 'number':
      tempFilter.push(filterInit[`min_${column}`] || null)
      tempFilter.push(filterInit[`max_${column}`] || null)
      break;
    case 'date':
      tempFilter.push(filterInit[`start_${column}`] || null)
      tempFilter.push(filterInit[`end_${column}`] || null)
      break;
    case 'datetime':
      tempFilter.push(filterInit[`start_dt_${column}`] || null)
      tempFilter.push(filterInit[`end_dt_${column}`] || null)
      break;
    case 'status':
      if (!!filterInit[column]) tempFilter = filterInit[column].split(',')
      break
    case 'role':
      if (!!filterInit[column]) tempFilter = filterInit[column].split(',')
      break
    }
    
  return tempFilter
}

const listPrimaryFields = (dataRecords:any, primaryField='', secondaryField='') => {
  return dataRecords.map((recordData:any) => {
    if (recordData[primaryField])   { return recordData[primaryField] }
    if (recordData[secondaryField]) { return recordData[secondaryField] }
    return null
  })
}

const capitalizeFirstLetter = (str:any) => {
  str = str.replace('_', '')
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const objectToQueryString = (object:any) => {
  let str = ""
  for (var key in object) {
    if (str != "") {
        str += "&";
    }
    str += key + "=" + encodeURIComponent(object[key]);
  }
  return str
}

const deleteParamPerPage = (router:any) => {
  delete router.query['page']
  delete router.query['limit']

  return router.query
}

const deleteFilterParams = (router:any, column:any) => {
  if (!!router.query['page']) router.query['page'] = 1

  switch(column['options']['type']) {
    case 'string':
      delete router.query[column['name']]
    case 'radio':
      delete router.query[column['name']]
    case 'number':
      delete router.query[`max_${column['name']}`]
      delete router.query[`min_${column['name']}`]
    case 'date':
      delete router.query[`start_${column['name']}`]
      delete router.query[`end_${column['name']}`]
    case 'datetime':
      delete router.query[`start_dt_${column['name']}`]
      delete router.query[`end_dt_${column['name']}`]
    case 'status':
      delete router.query[column['name']]
    case 'role':
      delete router.query[column['name']]
  }

  return router.query
}

const defaultPaginate = (ctx_query:any) => {
  let defaultPage = 1
  let defaultLimit = 15
  let queryParam = ctx_query

  if (!!!ctx_query.page) queryParam = { ...queryParam, page: defaultPage }
  if (!!!ctx_query.limit) queryParam = { ...queryParam, limit: defaultLimit }
  return queryParam
}

const setHeaderPublic = () => {
  return {'Authorization' : `PublicToken ${process.env.NEXT_PUBLIC_TOKEN}`}
}

function sleep(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { 
  extractError400, displayNameValidator, deleteParamPerPage, 
  filterColumns, filterColumnsResultTable, listPrimaryFields, capitalizeFirstLetter, 
  objectToQueryString, deleteFilterParams, defaultPaginate, sleep, setHeaderPublic
}

export default utilFunc
