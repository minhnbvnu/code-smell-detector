function my_mandreel_call_constructors(_ptr, size,stackPos) {
  my_heapNewPos = heapNewPos;
  my_heap = new ArrayBuffer(mandreel_total_memory);
  my_heap8 = new Int8Array(my_heap);
  my_heap32 = new Int32Array(my_heap);
  for (var i=0;i<mandreel_total_memory/4;i++) {
    my_heap32[i] = heap32[i];
  }
  my_old_constructors(_ptr,size,stackPos);
}