async function prepareOperation(manager, { caller, target, calldata, delay }) {
  const scheduledAt = (await time.clock.timestamp()) + 1n;
  await time.increaseTo.timestamp(scheduledAt, false); // Fix next block timestamp for predictability

  return {
    schedule: () => manager.connect(caller).schedule(target, calldata, scheduledAt + delay),
    scheduledAt,
    operationId: hashOperation(caller, target, calldata),
  };
}