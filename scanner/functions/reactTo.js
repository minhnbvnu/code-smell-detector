function reactTo (triggerFn, effectFn) {
  // note -- had issues with cyclical reactions in the past
  // the comments below will fix them if they come up again
  // DO NOT REMOVE THEM

  // function restartReaction() {
  reaction(
    triggerFn,
    (data, action) => {
      // action.dispose() // clear this "listener" so we don't cycle

      effectFn(data, action)

      // restartReaction() // restart the reaction after doing stuff to the data
    }
  )
  // }

  // restartReaction()
}