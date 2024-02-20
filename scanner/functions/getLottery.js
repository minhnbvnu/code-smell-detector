async function getLottery(roomId, guardId) {
  const { body } = await got.post(
    'https://api.live.bilibili.com/xlive/lottery-interface/v3/guard/join',
    {
      body: {
        roomid: roomId,
        id: guardId,
        type: 'guard',
        csrf_token: csrfToken,
        csrf: csrfToken,
      },
      form: true,
      json: true
    }
  )
  return body
}