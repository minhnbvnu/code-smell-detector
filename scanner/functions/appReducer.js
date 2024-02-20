function appReducer (state = initialState, { type, payload }) {
  switch (type) {
    case SET_PROJECT:
      return state.set('currentProject', payload.projectId)
    case LOGIN:
      return state.set('error', false)
    case LOGIN_SUCCESS:
      // trigger LOCATION_CHANGE action, should async
      // 存储数据到 localStorage 对象里
      const lanType = payload.result.preferredLanguage === 'chinese' ? 'zh' : 'en'
      localStorage.setItem('loginCreateBy', payload.result.createBy)
      localStorage.setItem('loginCreateTime', payload.result.createTime)
      localStorage.setItem('loginEmail', payload.result.email)
      localStorage.setItem('loginId', payload.result.id)
      localStorage.setItem('loginName', payload.result.name)
      localStorage.setItem('loginPassword', payload.result.password)
      localStorage.setItem('loginRoleType', payload.result.roleType)
      localStorage.setItem('loginUpdateBy', payload.result.updateBy)
      localStorage.setItem('loginUpdateTime', payload.result.updateTime)
      localStorage.setItem('preferredLanguage', lanType)
      localStorage.setItem('loginActive', payload.result.active)

      return state
        .set('locale', lanType)
        .set('roleType', payload.result.roleType)
    case LOGIN_FAILURE:
      return state
    case LOG_PSW_ERROR:
      return state
    case SET_ROLETYPE:
      return state.set('roleType', payload.type)
    default:
      return state
  }
}