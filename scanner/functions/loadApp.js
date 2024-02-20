function loadApp () {
  var synthJsonExists = fs.existsSync( path.join(process.cwd(), 'synth.json') );
  if (!synthJsonExists) {
    console.error('Could not find synth.json. Is this directory a Synth project?');
    process.exit(1);
  }

  try {
    return requireUncached( path.join(process.cwd(), 'back/back-app') );
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('A module failed to load. Maybe you should try running `synth install -b`');
      process.exit(1);
    } else throw err;
  }
}