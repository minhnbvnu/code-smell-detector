function regionScoreboardSuccess(data,dlg,logscale) {
  if (data.result === undefined) {
    return regionScoreboardFailure(dlg);
  }

  var agentTable = '<table><tr><th>#</th><th>Agent</th></tr>';
  for (var i=0; i<data.result.topAgents.length; i++) {
    var agent = data.result.topAgents[i];
    agentTable += '<tr><td>'+(i+1)+'</td><td class="nickname '+(agent.team=='RESISTANCE'?'res':'enl')+'">'+agent.nick+'</td></tr>';
  }
  if (data.result.topAgents.length==0) {
    agentTable += '<tr><td colspan="2"><i>no top agents</i></td></tr>';
  }
  agentTable += '</table>';


  var maxAverage = Math.max(data.result.gameScore[0], data.result.gameScore[1], 1);
  var teamRow = [];
  for (var t=0; t<2; t++) {
    var team = t==0 ? 'Enlightened' : 'Resistance';
    var teamClass = t==0 ? 'enl' : 'res';
    var teamCol = t==0 ? COLORS[TEAM_ENL] : COLORS[TEAM_RES];
    var barSize = Math.round(data.result.gameScore[t]/maxAverage*200);
    teamRow[t] = '<tr><th class="'+teamClass+'">'+team+'</th><td class="'+teamClass+'">'+digits(data.result.gameScore[t])+'</td><td><div style="background:'+teamCol+'; width: '+barSize+'px; height: 1.3ex; border: 2px outset '+teamCol+'"> </td></tr>';

  }

  var first = PLAYER.team == 'RESISTANCE' ? 1 : 0;

  // we need some divs to make the accordion work properly
  dlg.html('<div class="cellscore">'
         +'<b>Region scores for '+data.result.regionName+'</b>'
         +'<div><table>'+teamRow[first]+teamRow[1-first]+'</table>'
         +regionScoreboardScoreHistoryChart(data.result, logscale)+'</div>'
         +'<b>Checkpoint overview</b>'
         +'<div>'+regionScoreboardScoreHistoryTable(data.result)+'</div>'
         +'<b>Top agents</b>'
         +'<div>'+agentTable+'</div>'
         +'</div>');

  $('g.checkpoint', dlg).each(function(i, elem) {
    elem = $(elem);

    var tooltip = 'CP:\t'+elem.attr('data-cp')
      + '\nEnl:\t' + digits(elem.attr('data-enl'))
      + '\nRes:\t' + digits(elem.attr('data-res'));
    elem.tooltip({
      content: convertTextToTableMagic(tooltip),
      position: {my: "center bottom", at: "center top-10"}
    });
  });

  $('.cellscore', dlg).accordion({
    header: 'b',
    heightStyle: "fill",
  });

  $('input.logscale', dlg).change(function(){
    var input = $(this);
    regionScoreboardSuccess(data, dlg, input.prop('checked'));
  });
}