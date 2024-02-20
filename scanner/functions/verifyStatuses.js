function verifyStatuses(statusDisplays, props) {
  const nonEmptyStatusDisplays = stripEmptyValues(statusDisplays);
  const nonEmptyStatusProps = stripEmptyValues(props.usernameToStatus);
  let username;
  expect(Object.keys(nonEmptyStatusDisplays).length).toEqual(
    Object.keys(nonEmptyStatusProps).length,
  );
  for (username in nonEmptyStatusDisplays) {
    if (!nonEmptyStatusDisplays.hasOwnProperty(username)) {
      continue;
    }
    expect(nonEmptyStatusDisplays[username].getStatus()).toEqual(
      nonEmptyStatusProps[username],
    );
  }

  // now go the other way to make sure we got them all.
  for (username in nonEmptyStatusProps) {
    if (!nonEmptyStatusProps.hasOwnProperty(username)) {
      continue;
    }
    expect(nonEmptyStatusDisplays[username].getStatus()).toEqual(
      nonEmptyStatusProps[username],
    );
  }

  expect(Object.keys(nonEmptyStatusDisplays)).toEqual(
    Object.keys(nonEmptyStatusProps),
  );
}