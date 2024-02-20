function formatPatch(diff) {
	      var ret = [];

	      if (diff.oldFileName == diff.newFileName) {
	        ret.push('Index: ' + diff.oldFileName);
	      }

	      ret.push('===================================================================');
	      ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
	      ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

	      for (var i = 0; i < diff.hunks.length; i++) {
	        var hunk = diff.hunks[i]; // Unified Diff Format quirk: If the chunk size is 0,
	        // the first number is one lower than one would expect.
	        // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

	        if (hunk.oldLines === 0) {
	          hunk.oldStart -= 1;
	        }

	        if (hunk.newLines === 0) {
	          hunk.newStart -= 1;
	        }

	        ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
	        ret.push.apply(ret, hunk.lines);
	      }

	      return ret.join('\n') + '\n';
	    }