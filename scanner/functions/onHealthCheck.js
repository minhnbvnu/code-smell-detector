function onHealthCheck() {
  // checks if the system is healthy,
  // we can add the checks here as needed
  return Promise.all(
    [fetchRooms(getRoomsSource())],
  );
}