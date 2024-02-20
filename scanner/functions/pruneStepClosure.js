function pruneStepClosure(node) {
			return pruneStep(emap, pruneStepClosure, node);
		}