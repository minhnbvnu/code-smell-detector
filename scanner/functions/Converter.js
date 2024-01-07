function Converter(sm, opts) {
	  opts = opts || {};

	  if (opts.isFileComment) sm = readFromFileMap(sm, opts.commentFileDir);
	  if (opts.hasComment) sm = stripComment(sm);
	  if (opts.isEncoded) sm = decodeBase64(sm);
	  if (opts.isJSON || opts.isEncoded) sm = JSON.parse(sm);

	  this.sourcemap = sm;
	}