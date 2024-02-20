async function convertCmd(args) {
  const {bag, directory, start, end, format} = args;

  // Setup output directory
  try {
    deleteDirRecursive(directory);
  } catch (err) {
    // ignore
  }
  createDir(directory);

  const source = new FileSource(bag);
  const provider = await XVIZProviderFactory.open({
    options: {...args},
    source,
    root: bag
  });

  if (!provider) {
    throw new Error('Failed to create ROSBagProvider');
  }

  // This abstracts the details of the filenames expected by our server
  const sink = new FileSink(directory);

  const iterator = provider.getMessageIterator({startTime: start, endTime: end});
  if (!iterator.valid()) {
    throw new Error('Error creating and iterator');
  }

  const writer = new XVIZFormatWriter(sink, {format});

  const md = provider.xvizMetadata();

  // Augment metadata with timing information
  // if provided
  setMetadataTimes(md.message().data, start, end);
  writer.writeMetadata(md);

  // If we get interrupted make sure the index is written out
  signalWriteIndexOnInterrupt(writer);

  // Process data
  let frameSequence = 0;
  while (iterator.valid()) {
    const data = await provider.xvizMessage(iterator);
    if (data) {
      process.stdout.write(`Writing frame ${frameSequence}\r`);
      writer.writeMessage(frameSequence, data);
      frameSequence += 1;
    } else {
      console.log(`No data for frame ${frameSequence}`);
    }
  }

  writer.close();
}