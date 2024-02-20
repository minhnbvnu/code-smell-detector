async function pickMemberAsync (e, userId) {
  let key = `CHATGPT:GroupMemberInfo:${e.group_id}:${userId}`
  let cache = await redis.get(key)
  if (cache) {
    return JSON.parse(cache)
  }
  return new Promise((resolve, reject) => {
    e.group.pickMember(userId, true, (sender) => {
      redis.set(key, JSON.stringify(sender), { EX: 86400 })
      resolve(sender)
    })
  })
}