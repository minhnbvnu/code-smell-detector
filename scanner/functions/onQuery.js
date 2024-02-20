function onQuery(hook, ms, query /* , args*/) {
  if (!hook.meta.long_query_time || hook.meta.long_query_time < ms) {
    const message = `connectionId: ${query._connection.connectionId}, ${ms}ms ==> ${query.sql}`;
    console.log(chalk.keyword(hook.meta.color)(message));
  }
}