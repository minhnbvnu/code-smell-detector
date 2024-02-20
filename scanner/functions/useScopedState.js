function useScopedState() {
  const scope = useContext(ScopeContext);
  return useFieldState(scope);
}