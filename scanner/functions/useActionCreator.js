function useActionCreator(actionCreator) {
  const dispatch = useDispatch();
  return Object(react["useCallback"])((...args) => dispatch(actionCreator(...args)), [dispatch, actionCreator]);
}