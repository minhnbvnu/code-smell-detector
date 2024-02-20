async function bagdumpCmd(args) {
  const {bag: source, topic: mainTopic} = args;

  const bag = await open(source);

  if (args.dumpTime) {
    console.log(`start_time: ${TimeUtil.toDate(bag.startTime).getTime() / 1e3}`);
    console.log(`end_time: ${TimeUtil.toDate(bag.endTime).getTime() / 1e3}`);
  }

  if (args.dumpTopics) {
    const seen = [];
    for (const conn in bag.connections) {
      const {messageDefinition, topic, type} = bag.connections[conn];

      if (!seen[topic]) {
        seen[topic] = true;

        console.log(topic, type);
        if (args.dumpDefs) {
          console.log(messageDefinition);
        }
      }
    }
  }

  if (args.dumpMessages) {
    await bag.readMessages({}, ({topic, message}) => {
      if (!mainTopic || topic === mainTopic) {
        console.log(JSON.stringify(message, null, 2));
      }
    });
  }
}