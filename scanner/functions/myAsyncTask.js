async function myAsyncTask() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1)
  })
  return 'hello world'
}