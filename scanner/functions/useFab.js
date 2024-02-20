function useFab() {
  const { data, update } = useStorage(STOKEY_FAB);
  return { fab: data, updateFab: update };
}