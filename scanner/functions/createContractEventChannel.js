function createContractEventChannel ({
  contract,
  eventName,
  eventOptions
}) {
  const name = contract.contractName

  return eventChannel(emit => {
    const eventListener = contract.events[eventName](eventOptions)
      .on('data', event => {
        emit({ type: ContractActions.EVENT_FIRED, name, event })
      })
      .on('changed', event => {
        emit({ type: ContractActions.EVENT_CHANGED, name, event })
      })
      .on('error', error => {
        emit({ type: ContractActions.EVENT_ERROR, name, error })
        emit(END)
      })

    const unsubscribe = () => {
      eventListener.removeListener(eventName)
    }

    return unsubscribe
  })
}