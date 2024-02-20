function signalWriteIndexOnInterrupt(writer) {
  process.on('SIGINT', () => {
    console.log('Aborting, writing index file.');
    writer.close();
    process.exit(0); // eslint-disable-line no-process-exit
  });
}