function toggleEnv() {
  process.env.NODE_ENV =
    process.env.NODE_ENV === 'production' ? 'development' : 'production'
}