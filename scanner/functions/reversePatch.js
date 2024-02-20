function reversePatch(patch) {
		var reversed = dmp.patch_deepCopy(patch);
		for (var i = 0; i < reversed.length; i++) {
			for (var j = 0; j < reversed[i].diffs.length; j++) {
				reversed[i].diffs[j][0] = -(reversed[i].diffs[j][0]);
			}
		}
		return reversed;
	}