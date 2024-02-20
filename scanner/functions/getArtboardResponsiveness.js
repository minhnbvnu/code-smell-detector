function getArtboardResponsiveness(ab, settings) {
  var opts = getArtboardSettings(ab);
  var r = settings.responsiveness; // Default to document's responsiveness setting
  if (opts.dynamic) r = 'dynamic'; // ab name has ":dynamic" appended
  if (opts.fixed) r = 'fixed';     // ab name has ":fixed" appended
  return r;
}