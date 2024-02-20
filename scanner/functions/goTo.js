function goTo(target) {
	if (target >= smax || target == snum) return;
	go(target - snum);
}