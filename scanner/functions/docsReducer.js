function docsReducer(state, action) {
  switch (action.type) {
    case 'react':
      return {
        ...state,
        framework: 'react'
      }
    case 'html+js':
      return {
        ...state,
        framework: 'html+js'
      }

    case 'vue':
      return {
        ...state,
        framework: 'vue'
      }
    default:
      return state
  }
}