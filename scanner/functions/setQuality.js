function setQuality(quality) {
    quality = Math.min(Math.max(quality, 1), 100);

    if (currentQuality == quality) return; // don't recalc if unchanged

    var sf =
      quality < 50 ? Math.floor(5000 / quality) : Math.floor(200 - quality * 2);

    initQuantTables(sf);
    currentQuality = quality;
    //console.log('Quality set to: '+quality +'%');
  }