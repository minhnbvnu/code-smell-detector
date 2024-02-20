function getPostgresUrl() {
  const pgUser = params.postgres_user
  const pgPassword = params.postgres_pass ? `:${params.postgres_pass}` : ':postgres'
  const pgHost = params.postgres_host
  const pgPort = params.postgres_prisma_port
  const pgDb = params.postgres_db
  return `postgresql://${pgUser}${pgPassword}@${pgHost}:${pgPort}/${pgDb}`
}