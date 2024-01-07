function readFromFileMap(sm, dir) {
	  // NOTE: this will only work on the server since it attempts to read the map file

	  var r = exports.mapFileCommentRegex.exec(sm);

	  // for some odd reason //# .. captures in 1 and /* .. */ in 2
	  var filename = r[1] || r[2];
	  var filepath = path.resolve(dir, filename);

	  try {
	    return fs.readFileSync(filepath, 'utf8');
	  } catch (e) {
	    throw new Error('An error occurred while trying to read the map file at ' + filepath + '\n' + e);
	  }
	}