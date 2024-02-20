function runMandreel() {
  Mandreel_currentTime = 0;
  var sp = g_stack_pointer+800*1024;
  for (var i=0;i<mandreel_total_memory/4;i++) {
    heap32[i] = my_heap32[i];
  }
  tlsf_ptr = 0;
  heapNewPos = my_heapNewPos;
  my_old_constructors(llvm_2E_global_ctors,5,sp);
  heapU32[sp>>2] = 640;
  heapU32[(sp+4)>>2] = 480;
  __mandreel_internal_SetResolution(sp);
  __mandreel_internal_init(g_stack_pointer+800*1024);
  __init(g_stack_pointer+800*1024);
  for (var i = 0; i < 20; i++) {
    render();
    Mandreel_flushTimeouts();
    updateMandreelStats(performance.now());
  }
  Mandreel_checkState();
}