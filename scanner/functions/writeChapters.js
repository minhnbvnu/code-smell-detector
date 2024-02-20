function writeChapters(chapters) {
  data = {
    total: chapters.length,
    regions: sortedGroupByValue(chapters, 'region', 'chapters')
  }
  mkdirp.sync('.build/chapters')
  Fs.writeFile('.build/chapters/list.json', JSON.stringify(data, null, 2), function (err) {
    if (err) console.error(err)
  })
}