async function getHelpers() {
  const helpers = Object.values({
    ...(await getHelpersFromFiles())
  });
  helpers.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );
  return helpers;
}