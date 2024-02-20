async function resolveSampleMigrationFileName() {
  const migrationFileExtention = await resolveMigrationFileExtension();
  return `sample-migration${migrationFileExtention}`;
}