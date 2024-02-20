async function importFile(file) {
  try {
    const readFile = await readInputData(file);
    const events = JSON.parse(readFile);

    if (events.length === 0) {
      throw new InvalidProfileError('No profiling data found in file.');
    }

    const processedData = await preprocessData(events);
    return {
      status: 'SUCCESS',
      processedData
    };
  } catch (error) {
    if (error instanceof InvalidProfileError) {
      return {
        status: 'INVALID_PROFILE_ERROR',
        error
      };
    } else {
      return {
        status: 'UNEXPECTED_ERROR',
        error
      };
    }
  }
}