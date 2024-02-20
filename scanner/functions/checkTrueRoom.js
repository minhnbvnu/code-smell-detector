async function checkTrueRoom(roomId) {
  const { body } = await got.get(
    `https://api.live.bilibili.com/room/v1/Room/room_init?id=${roomId}`,
    { json: true }
  )
  if (body.code === 0) {
    const { is_hidden, is_locked, encrypted } = body.data
    return !(is_hidden || is_locked || encrypted)
  } else {
    logger.warning('guard: 获取房间信息失败')
    return false
  }
}