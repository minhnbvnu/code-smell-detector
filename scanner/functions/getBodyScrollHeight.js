async function getBodyScrollHeight() {
  const height = await executeScript(() => document.body.scrollHeight)
  return height[0]
}