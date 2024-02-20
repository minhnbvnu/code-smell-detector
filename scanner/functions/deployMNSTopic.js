async function deployMNSTopic(topicName, topicDefinition) {
  const properties = (topicDefinition || {}).Properties;
  if (properties === undefined) {
    console.error('MNSTopic resource properties must not be empty');
    return;
  }

  console.log(`\tWaiting for MNS topic ${topicName} to be deployed...`);

  await makeMnsTopic(topicName, properties);

  console.log(green(`\tmns topic ${topicName} deploy success`));
}