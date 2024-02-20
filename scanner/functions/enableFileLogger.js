async function enableFileLogger() {
  await app.whenReady();
  const desktopDir = app.getPath("desktop");

  const fileT = new winston.transports.File({
    filename: path.join(
      desktopDir,
      `ledgerlive-logs-${moment().format("YYYY.MM.DD-HH.mm.ss")}-${__GIT_REVISION__ ||
        "unversioned"}.log`,
    ),
  });

  add(fileT);
}