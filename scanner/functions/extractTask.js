function extractTask(witResponse) {
  let intents = witResponse.intents;
  let task = null;
  if (intents.length > 0) {
    let topIntent = intents[0];
    let topIntentName = topIntent.name;
    // If its a valid task, map to its equivalent task name
    if (topIntentName in TASKS) {
      task = TASKS[topIntentName];
    }
  }

  return task;
}