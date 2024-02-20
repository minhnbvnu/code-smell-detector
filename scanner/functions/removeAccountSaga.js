function* removeAccountSaga({ payload }) {
  try {
    const deleteStrategies = {
      [DeleteStrategyT.Archive]: deleteStrategyArchive,
      [DeleteStrategyT.Cleanup]: deleteStrategyCleanup,
      [DeleteStrategyT.Move]: deleteStrategyMove
    };
    const strategy = deleteStrategies[payload.strategy];
    if (strategy) yield strategy(payload.id, payload.moveTo);
  } catch (error) {
    yield put(removeAccountFailure(error.message));
  }
}