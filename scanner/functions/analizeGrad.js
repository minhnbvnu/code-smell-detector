function analizeGrad(string) {
    const colorPercents = string.substring(0, string.length - 1).split("%,");
    const colors = [];
    const percents = [];
    for (let colorPercent of colorPercents) {
      colors.push(colorPercent.substring(0, colorPercent.lastIndexOf(" ")).trim());
      percents.push(colorPercent.substring(colorPercent.lastIndexOf(" "), colorPercent.length) / 100);
    }
    return {colors: colors, percents: percents};
  }