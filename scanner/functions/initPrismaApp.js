async function initPrismaApp() {
  process.env.DATABASE_URL = getPostgresUrl()
  await exec('npx prisma generate')
  await exec('npx prisma migrate reset --force')
  delete process.env.DATABASE_URL
}