function resetChip(){
	stopChip();
        setStatus('resetting ' + chipname + '...');
	setTimeout(initChip,0);
}