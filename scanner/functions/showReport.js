function showReport(state, report){
        var log = '<table><thead><tr><th>Selector</th><th># Elms.</th><th># Child.</th><th> </th><th>Delta</th><th>Total</th></tr></thead>',
            all = Object_keys(state.results),
            worst = all.sort(function (a, b) {
                return state.results[a].time - state.results[b].time;
            }).slice(0, 20);

        forEach.call(worst, function (ii) {
            log += '<tr><td>Removing <strong style="font:12px monospace">' + ii +
                '</strong></td><td style="text-align:right; font:12px monospace">' + state.results[ii].length + '</td><td style="text-align:right; font:12px monospace">' + state.results[ii].children +
                '</td><td style="text-align:right">' + (state.results[ii].delta < 0 ? '<span style="color:red">saves</span>' : '<span style="color:green">adds</span>') +
                '</td><td style="text-align:right; font:12px monospace">' + formatNumber(Math.abs(state.results[ii].delta)/state.times) + 'ms</td><td style="text-align:right; font:12px monospace">' +
                formatNumber(state.results[ii].time/state.times) + 'ms</td></tr>\n';
        });
        log += '</table><hr/><table><tr><td style="text-align:right">Selectors Tested:</td><td style="font:12px monospace">' + all.length + '</td></tr>' +
          '<tr><td style="text-align:right">Baseline Time:</td><td style="font:12px monospace">' + formatNumber(state.baseTime/state.times) + 'ms</td></tr>' +
          '<tr><td style="text-align:right">Num. Tests:</td><td style="font:12px monospace">' + state.times + '</td></tr>';

        if(filter.call(all, function(cn){
          return state.results[cn].time <= 15;
        }).length) {
          log += '<tr><td style="color:red; text-align:right;font-weight:bold">Warning:</td><td>Increase the number<br />of tests to get more<br />accurate results</td></tr>';
        }

        report.innerHTML = log + '</table>';
        forEach.call(
          getChildren(report, 'td th'),
          function (td) {
            style(td, {
              padding: 1,
              verticalAlign: 'top',
              whiteSpace: 'nowrap',
              fontSize: 12
            });
          }
        );
    }