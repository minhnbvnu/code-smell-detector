function send_change(jsdoc, event) {
  if (event.setter_id != null && event.setter_id == 'py') {
    return
  } else if (pyodideWorker.busy && event.model && event.attr) {
    let events = []
    for (const old_event of pyodideWorker.queue) {
      if (!(old_event.model === event.model && old_event.attr === event.attr)) {
        events.push(old_event)
      }
    }
    events.push(event)
    pyodideWorker.queue = events
    return
  }
  const patch = jsdoc.create_json_patch([event])
  pyodideWorker.busy = true
  pyodideWorker.postMessage({type: 'patch', patch: patch})
}