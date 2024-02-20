async function getImg (e) {
  // 取消息中的图片、at的头像、回复的图片，放入e.img
  if (e.at && !e.source) {
    e.img = [`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.at}`]
  }
  if (e.source) {
    let reply
    let seq = e.isGroup ? e.source.seq : e.source.time
    if (e.adapter === 'shamrock') {
      seq = e.source.message_id
    }
    if (e.isGroup) {
      reply = (await e.group.getChatHistory(seq, 1)).pop()?.message
    } else {
      reply = (await e.friend.getChatHistory(seq, 1)).pop()?.message
    }
    if (reply) {
      let i = []
      for (let val of reply) {
        if (val.type === 'image') {
          i.push(val.url)
        }
      }
      e.img = i
    }
  }
  return e.img
}