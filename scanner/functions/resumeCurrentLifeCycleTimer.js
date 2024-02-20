function resumeCurrentLifeCycleTimer() {
	  var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
	      startTime = _lifeCycleTimerStack$.startTime,
	      nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
	      debugID = _lifeCycleTimerStack$.debugID,
	      timerType = _lifeCycleTimerStack$.timerType;
	
	  var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
	  currentTimerStartTime = startTime;
	  currentTimerNestedFlushDuration += nestedFlushDuration;
	  currentTimerDebugID = debugID;
	  currentTimerType = timerType;
	}