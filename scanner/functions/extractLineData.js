function extractLineData(errorString) {
			var lineData = errorString.match(/@#\[line:(\d+),col:(\d+)\]/);
			var errorInfo = {
				line: null,
				column: null
			};
			if (lineData) {
				errorInfo.line = parseInt(lineData[1], 10);
				errorInfo.column = parseInt(lineData[2], 10);
			}
			return errorInfo;
		}