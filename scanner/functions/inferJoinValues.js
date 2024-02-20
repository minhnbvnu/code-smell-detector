function inferJoinValues(alias, instance, config) {
  let hasAlias = true;
  let args = { alias, instance, config, hasAlias };
  if (typeof alias !== "string") {
    args.config = instance;
    args.instance = alias;
    args.hasAlias = false;
  }
  return args;
}