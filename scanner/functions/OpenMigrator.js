function OpenMigrator() {
  const { MigrationUtils } = ChromeUtils.import(
    "resource:///modules/MigrationUtils.jsm"
  );
  // We pass in the type of source we're using for use in telemetry:
  MigrationUtils.showMigrationWizard(window, [
    MigrationUtils.MIGRATION_ENTRYPOINT_PASSWORDS,
  ]);
}