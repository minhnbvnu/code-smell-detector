function clearHistory() {
	  ReactComponentTreeHook.purgeUnmountedComponents();
	  ReactHostOperationHistoryHook.clearHistory();
	}