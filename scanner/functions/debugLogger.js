function debugLogger () {
  // 只有在测试时才打印log
  if (commonConfig.is_test) {
    console.info(...arguments)
  }
}