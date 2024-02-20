function onGulpError(e) {
		// In the case that you call gulp.stop after a successful run,
		// we will not receive a task_err or task_stop event. This callback
		// will finish the run sequence execution in case of an 'orchestration aborted'
		// even coming from gulp's global error handler. That event is fired in when
		// gulp.stop is called.
		if(e.message === 'orchestration aborted') {
			finish(e);
		}
	}