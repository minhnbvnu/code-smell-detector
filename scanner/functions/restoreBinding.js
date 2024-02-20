function restoreBinding() {
  delete realBinding._mockedBinding;
  realBinding.Stats = realStats;
  realBinding.StatWatcher = realStatWatcher;
}