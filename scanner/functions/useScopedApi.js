function useScopedApi(scope) {
  const formApi = useFormApi();

  // VERY important to memoize the builder!
  const scopedFormApi = useMemo(() => buildScopedFormApi(scope, formApi), [
    scope
  ]);

  return scopedFormApi;
}