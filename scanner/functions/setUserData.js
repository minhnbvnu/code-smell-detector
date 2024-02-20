async function setUserData(qq, data) {
  const dir = 'resources/ChatGPTCache/user'
  const filename = `${qq}.json`
  const filepath = path.join(dir, filename)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filepath, JSON.stringify(data))
}