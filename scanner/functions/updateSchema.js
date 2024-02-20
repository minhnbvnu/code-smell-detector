async function updateSchema() {
  try {
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log(chalk.green('Schema has been regenerated'));
  } catch (err) {
    console.error(chalk.red(err.stack));
  }
}