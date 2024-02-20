function useQueryParams() {
  const {
    replace, search,
  } = useLocation();

  const getParams = () => {
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  };

  const setParams = (params) => {
    const stringfiedUrlSearchParams = new URLSearchParams(params).toString();
    replace(`?${stringfiedUrlSearchParams}`);
  };

  return {
    getParams, setParams,
  };
}