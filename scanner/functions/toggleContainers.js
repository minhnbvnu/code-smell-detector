function toggleContainers(containers, show) {
		var action = show ? 'show' : 'hide',
		    i;
		for (i = 0; i < containers.length; i++) {
			containers[i][action]();
		}
	}