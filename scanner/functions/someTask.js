function someTask() {
  const result = mySyncTask()
  return myNextTask(result)
}