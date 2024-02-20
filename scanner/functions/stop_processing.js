function stop_processing() {
			for (var i = 0; i < processing_list.length; i++) {
				processing_list[i].running = false;
			}
		}