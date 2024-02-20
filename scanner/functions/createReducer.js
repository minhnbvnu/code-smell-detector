function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    ...asyncReducers,
  });
}