async function resolveSampleMigrationPath() {
  const migrationsDir = await resolveMigrationsDirPath();
  const sampleMigrationSampleFileName = await resolveSampleMigrationFileName();
  return path.join(migrationsDir, sampleMigrationSampleFileName);
}