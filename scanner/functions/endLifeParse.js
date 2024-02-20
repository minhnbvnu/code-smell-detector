function endLifeParse(end_life) {
  var seconds, d;

  // passed validation but isn't a number, then set it zero (never end based on impressions)
  if (isNaN(parseInt(end_life.imp))) {
    end_life.imp = 0;
  }

  if (!end_life.time) {
    end_life.time = 0;
  } else if (end_life.time !== '0' && end_life.time !== 0 && end_life.time !== '') {
    try {
      d = new Date(Date.parse(end_life.time));
      if (d.getTime() != 0) {
        end_life.time = Math.floor(d.getTime() / 1000);
      }
    } catch (e) {
    }
  }

  return end_life;
}