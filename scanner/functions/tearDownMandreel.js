function tearDownMandreel() {
  my_old_constructors = null;
  my_heap = null;
  my_heap8 = null;
  my_heap32 = null;

  heap = null;
  heap8 = null;
  heapU8 = null;
  heap16 = null;
  heapU16 = null;
  heap32 = null;
  heapU32 = null;
  heapFloat = null;
  heapDouble = null;
  mandreelAppUsePackAsyncTexture = null;
  mandreelSumSquaredPauses = 0;
  mandreelSamples = 0;
}