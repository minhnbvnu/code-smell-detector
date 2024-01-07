function resetParameters() {
			first = true;
			scoringHistory = [];
			previousParameters = [];
			currentPositions = [];
			previousPositions = [];
			for (var i = 0;i < currentParameters.length;i++) {
				currentParameters[i] = 0;
			}
		}