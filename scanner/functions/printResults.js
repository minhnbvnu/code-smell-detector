function printResults(res) {
  for (var scenario in res) {
    if (program.compare) {
      var ref = JSON.parse(fs.readFileSync(program.compare).toString());
      var delta = +(res[scenario].mean - ref[scenario].mean).toFixed(2);
      var sig = !util.meansEqual(
        ref[scenario],
        res[scenario],
        1 - program.alpha
      );
      var relative = +(delta / ref[scenario].mean).toFixed(2);
      if (program.raw) {
        res[scenario].significant = sig;
        res[scenario].delta = delta;
        res[scenario].relative = relative;
      } else {
        var percent = (delta > 0 ? "+" : "") + relative * 100 + "%";
        if (!sig) {
          res[scenario].mean += " (" + percent + ")";
        } else if (delta > 0) {
          res[scenario].mean += color(" (" + percent + ")", BAD);
        } else {
          res[scenario].mean += color(" (" + percent + ")", GOOD);
        }
      }
    }
  }

  if (!program.raw && program.progress) {
    process.stdout.write("\n");
  }

  if (program.raw) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(
      prettyjson.render(res, {
        keysColor: "cyan",
        dashColor: "cyan",
      })
    );
  }
}