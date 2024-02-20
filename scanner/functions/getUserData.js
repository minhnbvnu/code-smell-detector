async function getUserData (user) {
  const dir = 'resources/ChatGPTCache/user'
  const filename = `${user}.json`
  const filepath = path.join(dir, filename)
  try {
    let data = fs.readFileSync(filepath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return {
      user,
      passwd: '',
      chat: [],
      mode: '',
      cast: {
        azure: '',
        api: '', // API设定
        bing: '', // 必应设定
        bing_resource: '', // 必应扩展资料
        slack: '' // Slack设定
      }
    }
  }
}