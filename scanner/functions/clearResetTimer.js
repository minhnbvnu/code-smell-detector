function clearResetTimer() {
	if ( resetTimerID ){
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}