function initHeap()
{
	heap = new ArrayBuffer(mandreel_total_memory);
	heap8 = new Int8Array(heap);
	heapU8 = new Uint8Array(heap);
	heap16 = new Int16Array(heap);
	heapU16 = new Uint16Array(heap);
	heap32 = new Int32Array(heap);
	heapU32 = new Uint32Array(heap);
	heapFloat = new Float32Array(heap);
	heapDouble = new Float64Array(heap);


	for (var i=0;i<mandreel_total_memory/4;i++)
	{
		heapU32[i] = 0;
	}
}