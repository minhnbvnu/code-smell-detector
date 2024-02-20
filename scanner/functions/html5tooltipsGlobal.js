function html5tooltipsGlobal(userTModels, userOptions)
{
  if (userTModels.length)
    // merge arrays
    Array.prototype.push.apply(tModels, userTModels);

  else if (typeof userTModels === "object")
    tModels.push(userTModels);

  options = userOptions ? extend({}, userOptions) : options;

  tieTooltips();
}