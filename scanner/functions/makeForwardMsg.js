async function makeForwardMsg (e, msg = [], dec = '') {
  if (Version.isTrss) {
    return common.makeForwardMsg(e, msg, dec)
  }
  let nickname = e.bot.nickname
  if (e.isGroup) {
    try {
      let info = await e.bot.getGroupMemberInfo(e.group_id, getUin(e))
      nickname = info.card || info.nickname
    } catch (err) {
      console.error(`Failed to get group member info: ${err}`)
    }
  }
  let userInfo = {
    user_id: getUin(e),
    nickname
  }

  let forwardMsg = []
  msg.forEach((v) => {
    forwardMsg.push({
      ...userInfo,
      message: v
    })
  })
  let is_sign = true
  /** 制作转发内容 */
  if (e.isGroup) {
    forwardMsg = await e.group.makeForwardMsg(forwardMsg)
  } else if (e.friend) {
    forwardMsg = await e.friend.makeForwardMsg(forwardMsg)
  } else {
    return msg.join('\n')
  }
  let forwardMsg_json = forwardMsg.data
  if (typeof (forwardMsg_json) === 'object') {
    if (forwardMsg_json.app === 'com.tencent.multimsg' && forwardMsg_json.meta?.detail) {
      let detail = forwardMsg_json.meta.detail
      let resid = detail.resid
      let fileName = detail.uniseq
      let preview = ''
      for (let val of detail.news) {
        preview += `<title color="#777777" size="26">${val.text}</title>`
      }
      forwardMsg.data = `<?xml version="1.0" encoding="utf-8"?><msg brief="[聊天记录]" m_fileName="${fileName}" action="viewMultiMsg" tSum="1" flag="3" m_resid="${resid}" serviceID="35" m_fileSize="0"><item layout="1"><title color="#000000" size="34">转发的聊天记录</title>${preview}<hr></hr><summary color="#808080" size="26">${detail.summary}</summary></item><source name="聊天记录"></source></msg>`
      forwardMsg.type = 'xml'
      forwardMsg.id = 35
    }
  }
  forwardMsg.data = forwardMsg.data
    .replace(/\n/g, '')
    .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
    .replace(/___+/, `<title color="#777777" size="26">${dec}</title>`)
  if (!is_sign) {
    forwardMsg.data = forwardMsg.data
      .replace('转发的', '不可转发的')
  }
  return forwardMsg
}