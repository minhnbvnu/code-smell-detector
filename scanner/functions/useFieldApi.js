function useFieldApi(n, scoped = true) {
  const formApi = useFormApi();
  const name = scoped ? useScope(n) : n;

  const fieldApi = useMemo(() => buildFieldApi(formApi, name), [name]);
  return fieldApi;
}