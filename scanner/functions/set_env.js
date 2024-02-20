function set_env(value) {
  process.env.AZK_ENV = value;
  process.env.NODE_ENV = process.env.AZK_ENV;
  return value;
}