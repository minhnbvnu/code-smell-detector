function getUin (e) {
  if (e?.self_id) return e.self_id
  if (e?.bot?.uin) return e.bot.uin
  if (Array.isArray(Bot.uin)) {
    if (Config.trssBotUin && Bot.uin.indexOf(Config.trssBotUin) > -1) { return Config.trssBotUin } else {
      Bot.uin.forEach((u) => {
        if (Bot[u].self_id) {
          return Bot[u].self_id
        }
      })
      return Bot.uin[Bot.uin.length - 1]
    }
  } else return Bot.uin
}