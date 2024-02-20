async function getAvailableBingToken (conversation, throttled = []) {
  let allThrottled = false
  if (!await redis.get('CHATGPT:BING_TOKENS')) {
    return {
      bingToken: null,
      allThrottled
    }
    // throw new Error('未绑定Bing Cookie，请使用#chatgpt设置必应token命令绑定Bing Cookie')
  }

  let bingToken = ''
  let bingTokens = JSON.parse(await redis.get('CHATGPT:BING_TOKENS'))
  const normal = bingTokens.filter(element => element.State === '正常')
  const restricted = bingTokens.filter(element => element.State === '受限')

  // 判断受限的token是否已经可以解除
  for (const restrictedToken of restricted) {
    const now = new Date()
    const tk = new Date(restrictedToken.DisactivationTime)
    if (tk <= now) {
      const index = bingTokens.findIndex(element => element.Token === restrictedToken.Token)
      bingTokens[index].Usage = 0
      bingTokens[index].State = '正常'
    }
  }
  if (normal.length > 0) {
    const minElement = normal.reduce((min, current) => {
      return current.Usage < min.Usage ? current : min
    })
    bingToken = minElement.Token
  } else if (restricted.length > 0 && restricted.some(x => throttled.includes(x.Token))) {
    allThrottled = true
    const minElement = restricted.reduce((min, current) => {
      return current.Usage < min.Usage ? current : min
    })
    bingToken = minElement.Token
  } else {
    // throw new Error('全部Token均已失效，暂时无法使用')
    return {
      bingToken: null,
      allThrottled
    }
  }
  // 记录使用情况
  const index = bingTokens.findIndex(element => element.Token === bingToken)
  bingTokens[index].Usage += 1
  await redis.set('CHATGPT:BING_TOKENS', JSON.stringify(bingTokens))
  return {
    bingToken,
    allThrottled
  }
}