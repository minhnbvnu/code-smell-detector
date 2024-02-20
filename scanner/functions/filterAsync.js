async function filterAsync(array, checkWorkflowSuccess) {
  const filterMap = await Promise.all(array.map(checkWorkflowSuccess))
  return array.filter((_, index) => filterMap[index])
}