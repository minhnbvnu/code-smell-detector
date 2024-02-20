async function configCmd(args) {
  const {bag: source} = args;
  const bag = await open(source);

  const seen = [];
  const topics = [];
  for (const conn in bag.connections) {
    const {topic, type} = bag.connections[conn];

    if (!seen[topic]) {
      seen[topic] = true;
      topics.push({topic, type});
    }
  }

  const config = {
    topicConfig: topics
  };

  console.log(JSON.stringify(config, null, 2));
}