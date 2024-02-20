function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}