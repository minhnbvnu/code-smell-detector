function __init () {
  // 监听 JavaScript 报错异常(JavaScript runtime error)
  // window.onerror = function () {
  //   if (window.ignoreError) {
  //     window.ignoreError = false
  //     return
  //   }

  //   handleError(formatRuntimerError.apply(null, arguments))
  // }

  // 监听资源加载错误(JavaScript Scource failed to load)
  window.addEventListener('error', function (event) {
    // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
    var errorTarget = event.target
    if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
      handleError(formatLoadError(errorTarget))
    } else {
      // onerror会被覆盖, 因此转为使用Listener进行监控
      let { message, filename, lineno, colno, error } = event
      handleError(formatRuntimerError(message, filename, lineno, colno, error))
    }
  }, true)

  //监听开发中浏览器中捕获到未处理的Promise错误
  window.addEventListener('unhandledrejection', function (event) {
    console.log('Unhandled Rejection at:', event.promise, 'reason:', event.reason);
    handleError(event)
  }, true)

  // 针对 vue 报错重写 console.error
  // TODO
  console.error = (function (origin) {
    return function (info) {
      var errorLog = {
        type: ERROR_CONSOLE,
        desc: info
      }

      handleError(errorLog)
      origin.call(console, info)
    }
  })(console.error)
}