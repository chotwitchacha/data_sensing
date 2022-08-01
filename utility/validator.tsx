export function emailValidator(email) {
  email = email.trim()
  let error = []
  if (!email) error.push('validator_email_blank')
  if (email.length > 255) error.push('validator_email_exceed_length')

  const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!regex_email.test(email)) error.push('validator_email_wrong_format')
  return error
}

export function passwordValidator(password) {
  password = password.trim()
  let error = []
  if (!password) error.push('validator_password_blank')
  if (password.length > 255) error.push('validator_password_exceed_length')

  return error
}

export function passwordValidatorITAudit(password) {
  password = password.trim()
  let error = []
  if (!password) error.push(`validator_password_blank`)
  if (password.length > 255) error.push(`validator_password_exceed_length`)

  let isPasswordLess = password.length < 8
  let isHaveUpper = !!password.match(/.*(?=.*?[A-Z]).*/)
  let isHaveLower = !!password.match(/.*(?=.*?[a-z]).*/)
  let isHaveNumber = !!password.match(/.*(?=.*?[0-9]).*/)
  let isFormatEngNumSpecialChar = !!password.match(/^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/)

  if (password && !isFormatEngNumSpecialChar)  error.push(`validate_it_audit_password_format_case`)
  if (password && (isPasswordLess || !isHaveUpper || !isHaveLower || !isHaveNumber)) error.push(`validate_it_audit_password_minimum_and_format_case`)

  return error
}

export function displayNameValidator(name) {
  name = name.trim()
  let error = []
  if (name.length > 255) error.push('validator_display_name_exceed_length')

  return error
}

export function confirmPasswordValidator(password, confirmPassword) {
  password = password.trim()
  confirmPassword = confirmPassword.trim()
  let error = []
  if (!confirmPassword) error.push('validator_confirm_password_blank')
  if (confirmPassword.length > 255) error.push('validator_confirm_password_exceed_length')
  if (password != confirmPassword) error.push('validator_confirm_password_dont_match')

  return error
}

export function formValidator(email, password, confirmPassword) {
  let error = []
  error = error.concat(emailValidator(email))
  error = error.concat(passwordValidatorITAudit(password))
  error = error.concat(confirmPasswordValidator(password, confirmPassword))

  return error
}

export function oldPasswordValidator(oldPassword) {
  oldPassword = oldPassword.trim()
  let error = []

  if (oldPassword.length > 255) error.push('validator_old_password_exceed_length')

  return error
}

export function userNameValidator(name) {
  let error = []

  if (!name) error.push('validator_name_blank')
  if (name.length > 255) error.push('validator_name_exceed_length')

  return error
}

export function userNameLoginValidator(username) {
  let error = []

  if (!username) error.push('validator_username_blank')
  if (username.length > 255) error.push('validator_username_exceed_length')

  const regex_username =/\s|[ก-๙]+/
  if (regex_username.test(username)) error.push('validator_username_wrong_format')

  return error
}

export function roleValidator(roleInput, roles) {
  let error = []

  if (!roleInput) error.push('validator_role_blank')
  if (roleInput && !roles.includes(roleInput)) error.push('validator_role_not_found')

  return error
}

export function createReportValidator(name, description, pipeline, charts) {
  let error = []
  if (!name) error.push('validator_name_blank')
  if (name.length > 255) { error.push('validator_name_exceed_length')}
  if (description.length > 1024) { error.push('validator_report_description_exceed_length')}
  if (charts.length > 0){
    error = [...error, ...reportChartValidator(charts)]
  }

  return error
}

export function reportChartValidator(chartData) {
  const regexSpace = /\s/
  let error = []
  let tempNames = []
  let tempIdentifier = []
  
  chartData.forEach((data, index) => {
    if (data['name']) { data['name'] = data['name'].trim()}
    if (data['identifier']) { data['identifier'] = data['identifier'].trim()}
    if (tempNames.includes(data['name'])) { error.push(['chart_name_is_duplicate', {index: index + 1}])  }
    if (tempIdentifier.includes(data['identifier'])) { error.push(['chart_identifier_is_duplicate', {index: index + 1}])}

    if (!data['name']) { error.push(['chart_name_is_blank', {index: index + 1}])}
    if (data['name'].length > 255) { error.push(['chart_name_to_long', {index: index + 1}]);}

    if (!data['identifier']) { error.push(['chart_identifier_is_blank', {index: index + 1}])}
    if (data['identifier'].length > 255) { error.push(['chart_identifier_to_long', {index: index + 1}]);}
    if (data['identifier'] && regexSpace.test(data['identifier'])) { error.push([`chart_identifier_is_invalid`, {index: index + 1}]) }

    if (data['axis_x'].length <= 0) { error.push(['chart_axis_x_is_blank', {index: index + 1}])}
    if (data['axis_y'].length <= 0) { error.push(['chart_axis_y_is_blank', {index: index + 1}])}
    if (data['name'].length > 0) { tempNames.push(data['name']) }
    if (data['identifier'].length > 0) { tempIdentifier.push(data['identifier']) }
  })
  return error
}

export function previewValidator(pipeline) {
  let error = []
  // if (!pipeline.collection) { error.push('validator_report_collection_blank') }
  // if (!pipeline.commands) { error.push('validator_report_command_blank') }
  return error
}

export function assetValidator(assets, mode, oldAssetFileName) {
  let errorMassage = []
  assets.forEach((asset, index) => {
    if (assets.filter(item => item['name'] == asset['name']).length > 1) errorMassage.push(`validator_asset_name_duplicate/${index+1}`)
    if (!asset['name']) errorMassage.push(`validator_asset_name_blank/${index+1}`)
    const name_regex = /\s/
    if (asset['name'] && name_regex.test(asset['name'])) errorMassage.push(`validator_asset_name_wrong_format/${index+1}`)
    
    const float_regex = /^([0-9]*[.])?[0-9]+$/
    if (!asset['width'] && parseFloat(asset['width']) != 0) errorMassage.push(`validator_asset_width_blank/${index+1}`)
    if (!asset['height'] && parseFloat(asset['height']) != 0) errorMassage.push(`validator_asset_height_blank/${index+1}`)
    if (asset['width'] && !float_regex.test(asset['width'])) errorMassage.push(`validator_asset_width_wrong_format/${index+1}`)
    if (asset['height'] && !float_regex.test(asset['height'])) errorMassage.push(`validator_asset_height_wrong_format/${index+1}`)
    if (asset['width'] && float_regex.test(asset['width']) && parseFloat(asset['width']) > 841.0) errorMassage.push(`validator_asset_width_exceed_max/${index+1}`)
    if (asset['height'] && float_regex.test(asset['width']) && parseFloat(asset['height']) > 1189.0) errorMassage.push(`validator_asset_height_exceed_max/${index+1}`)
    
    if (mode=='new' && !asset['file']) errorMassage.push(`validator_asset_file_blank/${index+1}`)
    if (mode=='edit' && !asset['file'] && index > oldAssetFileName.length - 1) errorMassage.push(`validator_asset_file_blank/${index+1}`)
  })
  return errorMassage
}

export function templateValidator(file, name, mode) {
  let errorMassage = []
  if (!name) errorMassage.push('validator_template_name_blank')
  if (name.length > 100) errorMassage.push('validator_template_name_exceed_length')

  if (mode=='new' && (file == null || file == undefined)) errorMassage.push('validator_template_file_blank')
  return errorMassage
}

export function chartSizeValidator(chartData) {
  let errorMassage = []
  chartData.forEach((data, index) => {
    const float_regex = /^([0-9]*[.])?[0-9]+$/
    if (!data['width'] && parseFloat(data['width']) != 0) errorMassage.push(`validator_chart_width_blank/${index+1}`)
    if (!data['height'] && parseFloat(data['height']) != 0) errorMassage.push(`validator_chart_height_blank/${index+1}`)
    if (data['width'] && !float_regex.test(data['width'])) errorMassage.push(`validator_chart_width_wrong_format/${index+1}`)
    if (data['height'] && !float_regex.test(data['height'])) errorMassage.push(`validator_chart_height_wrong_format/${index+1}`)
    if (data['width'] && float_regex.test(data['width']) && parseFloat(data['width']) > 841.0) errorMassage.push(`validator_chart_width_exceed_max/${index+1}`)
    if (data['height'] && float_regex.test(data['width']) && parseFloat(data['height']) > 1189.0) errorMassage.push(`validator_chart_height_exceed_max/${index+1}`)
  })
  return errorMassage
}

export function dashboardValidator(dashboardName) {
  let errorMassage = []

  if (!dashboardName) errorMassage.push('validator_dashboard_name_blank')
  if (dashboardName && dashboardName.length > 255) errorMassage.push('validator_dashboard_name_exceed_length')
  return errorMassage
}

export function panelValidator(panelDatas) {
  let errorMassage = []
  panelDatas.forEach((data, index) => {
    if (data['label'] && data['label'].length > 255) errorMassage.push(`validator_panel_label_exceed_length/${index+1}`)
    if (!data['report']) errorMassage.push(`validator_panel_report_blank/${index+1}`)
    if (!data['limit'] && parseInt(data['limit']) != 0 && data['content'] == 'table') errorMassage.push(`validator_panel_limit_blank/${index+1}`)
    if (data['limit'] && (parseInt(data['limit']) > 100 || parseInt(data['limit']) < 0)) errorMassage.push(`validator_panel_limit_exceed_length/${index+1}`)
  })
  return errorMassage
}

export const customLogoAppNameValidator = (appName) => {
  appName = appName.trim()
  let error = []
  if (appName.length > 30) error.push('validator_app_name_exceed_length')

  return error
}
export const customLogoTitleValidator = (titleName) => {
  titleName = titleName.trim()
  let error = []
  if (!titleName) error.push('validator_title_name_blank')
  if (titleName.length > 30) error.push('validator_title_name_exceed_length')

  return error
}
export function validatorLengthGroupName(values, maxLength, fieldName='', blank=false) {
  if (!blank && values.length <= 0) return [`validate_group_name_blank`]
  if (values.length > maxLength) return ['validator_group_name_length_more', {length: maxLength}]
}
