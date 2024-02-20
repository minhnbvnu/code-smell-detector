async function goToRoom(roomId) {
  const { body } = await got.post(
    'https://api.live.bilibili.com/room/v1/Room/room_entry_action',
    {
      body: {
        room_id: roomId,
        csrf_token: csrfToken,
        csrf: csrfToken,
        platform: 'pc',
      },
      form: true,
      json: true
    }
  )
  return body
}