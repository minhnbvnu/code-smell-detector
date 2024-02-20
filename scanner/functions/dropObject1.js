function dropObject1(idx) {
	if (idx < 36) return;
	heap1[idx] = heap_next1;
	heap_next1 = idx;
}