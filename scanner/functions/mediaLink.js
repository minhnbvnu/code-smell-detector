async function mediaLink() {
  const ip = await getPublicIP()
  const testServer = await fetch(`${Config.cloudTranscode}/check`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: `http://${ip}:${Config.serverPort || 3321}/`
      })
    })
  if (testServer.ok) {
    const checkCloudData = await testServer.json()
    if (checkCloudData.state == 'error') {
      console.log('本地服务无法访问，开启media服务代理')
      const serverurl = new URL(Config.cloudTranscode)
      const ws = new websocketclient(`ws://${serverurl.hostname}${serverurl.port ? ':' + serverurl.port : ''}/ws`)
      ws.on('open', () => {
        ws.send(JSON.stringify({
          command: 'register',
          region: getUin(),
          type: 'server',
        }))
      })
      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message)
          switch (data.command) {
            case 'register':
              if (data.state) {
                let master = (await getMasterQQ())[0]
                if (Array.isArray(Bot.uin)) {
                  Bot.pickFriend(master).sendMsg(`当前chatgpt插件服务无法被外网访问，已启用代理链接，访问代码：${data.token}`)
                } else {
                  Bot.sendPrivateMsg(master, `当前chatgpt插件服务无法被外网访问，已启用代理链接，访问代码：${data.token}`, false)
                }
              } else {
                console.log('注册区域失败')
              }
              break
            case 'login':
              if (data.token) {
                const user = UserInfo(data.token)
                if (user) {
                  ws.login = true
                  ws.send(JSON.stringify({ command: data.command, state: true, region: getUin(), type: 'server' }))
                } else {
                  ws.send(JSON.stringify({ command: data.command, state: false, error: '权限验证失败', region: getUin(), type: 'server' }))
                }
              }
              break
            case 'post_login':
              if (data.qq && data.passwd) {
                const token = randomString(32)
                if (data.qq == getUin() && await redis.get('CHATGPT:ADMIN_PASSWD') == data.passwd) {
                  AddUser({ user: data.qq, token: token, autho: 'admin' })
                  ws.send(JSON.stringify({ command: data.command, state: true, autho: 'admin', token: token, region: getUin(), type: 'server' }))

                } else {
                  const user = await getUserData(data.qq)
                  if (user.passwd != '' && user.passwd === data.passwd) {
                    AddUser({ user: data.qq, token: token, autho: 'user' })
                    ws.send(JSON.stringify({ command: data.command, state: true, autho: 'user', token: token, region: getUin(), type: 'server' }))
                  } else {
                    ws.send(JSON.stringify({ command: data.command, state: false, error: `用户名密码错误,如果忘记密码请私聊机器人输入 ${data.qq == getUin() ? '#修改管理密码' : '#修改用户密码'} 进行修改`, region: getUin(), type: 'server' }))
                  }
                }
              } else {
                ws.send(JSON.stringify({ command: data.command, state: false, error: '未输入用户名或密码', region: getUin(), type: 'server' }))
              }
              break
            case 'post_command':
              console.log(data)
              const fetchOptions = {
                method: 'POST',
                body: data.postData
              }
              const response = await fetch(`http://localhost:${Config.serverPort || 3321}${data.postPath}`, fetchOptions)
              if (response.ok) {
                const json = await response.json()
                ws.send(JSON.stringify({ command: data.command, state: true, region: getUin(), type: 'server', path: data.postPath, data: json }))
              }
              break
          }
        } catch (error) {
          console.log(error)
        }
      })

    } else {
      console.log('本地服务网络正常，无需开启通讯')
    }
  } else {
    console.log('media服务器未响应')
  }
}