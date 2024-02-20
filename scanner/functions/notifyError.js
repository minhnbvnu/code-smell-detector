function notifyError (err, title) {
  notification.error({
    message: title,
    description: err.toString(),
    duration: null
  })
}