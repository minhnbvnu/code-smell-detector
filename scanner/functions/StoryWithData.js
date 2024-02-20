async function StoryWithData({ id }) {
  const data = await fetchData(`item/${id}`)
  const story = transform(data)

  return <Story {...story} />
}