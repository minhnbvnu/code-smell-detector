function createMessageHandler(config) {
  return async function handleMessage(message) {
    const date = new Date()
    const h = date.getHours().toString().padStart(2, "0")
    const m = date.getMinutes().toString().padStart(2, "0")
    const s = date.getSeconds().toString().padStart(2, "0")
    const time = `${h}:${m}:${s}`
    const filterFunction = await getFilterFunction(config)
    try {
      const data = filterFunction(message.data, message.origin, message.destination)
      if (data === null) return
      addRow(message.origin, message.destination, data, time)
    } catch (e) {
      addRow(message.origin, message.destination, `ERROR: ${e.toString()}`, time)
    }

  }
}