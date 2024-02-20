function handleResults(pr) {
        var output = document.getElementById("output");
        function print(str) {
            output.appendChild(document.createTextNode(str));
            output.appendChild(document.createElement("br"));
        }
        function printarr(arr) {
            for (var i = 0; i < arr.length; i++) print(arr[i]);
        }
        function percent(num) {
            return (num*100).toFixed(2) + "%";
        }

        // clear out the intermediate results
        if (pr) output.innerHTML = "";

        // totals
        var totals = {
            mean: 1,
            stddev: 1,
            sem: 1,
            ci: 1,
            runs: 0
        };

        // stuff to print later
        var ptotals = [];
        var presults = [];
        var praw = [];
        var spc = "\u00a0\u00a0";
        var spc2 = spc + spc;

        // calculate all the real results
        for (var b = 0; b < benchmarks.length; b++) {
            var benchmark = benchmarks[b];
            var modes = getModes(benchmark);
            if (pr) {
                presults.push(spc + benchmark + ":");
                praw.push(spc + benchmark + ":");
            }

            for (var m = 0; m < modes.length; m++) {
                var mode = modes[m];
                var bmresults = results[benchmark][mode].slice(-keepRuns);
                if (bmresults.length == 0) continue;

                // get the raw results
                var rr = spc2 + mode + ": [";
                for (var i = 0; i < bmresults.length; i++) {
                    if (i != 0) rr += ", ";
                    rr += bmresults[i];
                }
                rr += "]";
                if (pr) praw.push(rr);

                // now get the stats for this run
                var bmstats = stats(bmresults);

                // mul it to the totals
                totals.mean *= bmstats.mean;
                totals.stddev *= bmstats.stddev;
                totals.sem *= bmstats.sem;
                totals.ci *= bmstats.ci;
                totals.runs++;

                // and output it
                if (pr) presults.push(spc2 + mode + ": " +
                    bmstats.mean.toFixed(2) + "ms � " + percent(bmstats.cim) +
                    " (stddev=" + percent(bmstats.sm) + ", stderr=" +
                    percent(bmstats.semm) + ")");
            }

            if (pr) {
                presults.push("");
                praw.push("");
            }
        }

        // now calculate the totals
        var power = 1 / totals.runs;
        totals.mean = Math.pow(totals.mean, power);
        totals.stddev = Math.pow(totals.stddev, power);
        totals.sm = totals.stddev / totals.mean;
        totals.sem = Math.pow(totals.sem, power);
        totals.semm = totals.sem / totals.mean;
        totals.ci = Math.pow(totals.ci, power);
        totals.cim = totals.ci / totals.mean;
        ptotals.push("Final results:");
        ptotals.push(spc + totals.mean.toFixed(2) + "ms � " + percent(totals.cim) + " (lower is better)");
        ptotals.push(spc + "Standard deviation = " + percent(totals.sm) + " of mean");
        ptotals.push(spc + "Standard error = " + percent(totals.semm) + " of mean");
        if (totals.cim >= maxCIM)
            ptotals.push(spc + "WARNING: These results are not trustworthy! After " + maxRuns + " runs, 95% confidence interval is still greater than " + percent(maxCIM) + " of the mean!");
        else
            ptotals.push(spc + curRun + " runs");
        ptotals.push("");

        // if there are errors, mark those too
        if ("errors" in results) {
            ptotals.push("ERRORS:");
            for (var i = 0; i < results.errors.length; i++) ptotals.push(spc + results.errors[i]);
            ptotals.push("");
        }

        if (pr) {
            // and print it all out
            printarr(ptotals);
            print("Result breakdown:");
            printarr(presults);
            print("Raw results:");
            printarr(praw);
        }

        return totals;
    }