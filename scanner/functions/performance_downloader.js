async function performance_downloader() {
  await Promise.allSettled([
    get_latest_main("./tools/benchmark/ical_main.cjs"),
    get_latest_release("./tools/benchmark/ical_release.js")
  ]);
}