function addHeapObject1(obj) {
	if (heap_next1 === heap1.length) heap1.push(heap1.length + 1);
	const idx = heap_next1;
	heap_next1 = heap1[idx];
	heap1[idx] = obj;
	return idx;
}