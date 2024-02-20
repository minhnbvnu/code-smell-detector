function regionScoreboardScoreHistoryChart(result, logscale) {
  // svg area 400x130. graph area 350x100, offset to 40,10

  if(!Math.log10)
    Math.log10 = function(x) { return Math.log(x) / Math.LN10; };

  var max = Math.max(result.gameScore[0],result.gameScore[1],10); //NOTE: ensure a min of 10 for the graph
  var items = []; //we'll copy the items to an array indexed by checkpoint number - easier to access!
  for (var i=0; i<result.scoreHistory.length; i++) {
    max = Math.max(max, result.scoreHistory[i][1], result.scoreHistory[i][2]); //note: index 0 is the checkpoint number here
    items[result.scoreHistory[i][0]] = [result.scoreHistory[i][1], result.scoreHistory[i][2]];
  }

  // scale up maximum a little, so graph isn't squashed right against upper edge
  max *= 1.09;

  // 0 cannot be displayed on a log scale, so we set the minimum to 0.001 and divide by lg(0.001)=-3
  var scale = logscale
    ? function(y) { return  10 - Math.log10(Math.max(0.001,y/max)) / 3 * 100; }
    : function(y) { return 110-y/max*100; };

  var teamPaths = [[],[]];
  var otherSvg = [];

  for (var i=0; i<items.length; i++) {
    var x=i*10+40;
    if (items[i] !== undefined) {
      // paths
      if (i>0 && items[i-1] !== undefined) {
        for (var t=0; t<2; t++) {
          teamPaths[t].push('M'+(x-10)+','+scale(items[i-1][t])+' L'+x+','+scale(items[i][t]));
        }
      }
      // markers
      otherSvg.push('<g title="test" class="checkpoint" data-cp="'+i+'" data-enl="'+items[i][0]+'" data-res="'+items[i][1]+'">');
      otherSvg.push('<rect x="'+(i*10+35)+'" y="10" width="10" height="100" fill="black" fill-opacity="0" />');
      for (var t=0; t<2; t++) {
        var col = t==0 ? COLORS[TEAM_ENL] : COLORS[TEAM_RES];
        otherSvg.push('<circle cx="'+x+'" cy="'+scale(items[i][t])+'" r="3" stroke-width="1" stroke="'+col+'" fill="'+col+'" fill-opacity="0.5" />');
      }
      otherSvg.push('</g>');
    }
  }


  var paths = '<path d="M40,110 L40,10 M40,110 L390,110" stroke="#fff" />';

  // graph tickmarks - horizontal
  var ticks = [];
  for (var i=5; i<=35; i+=5) {
    var x=i*10+40;
    ticks.push('M'+x+',10 L'+x+',110');
    otherSvg.push('<text x="'+x+'" y="125" font-size="12" font-family="Roboto, Helvetica, sans-serif" text-anchor="middle" fill="#fff">'+i+'</text>');
  }

  // vertical
  // first we calculate the power of 10 that is smaller than the max limit
  var vtickStep = Math.pow(10,Math.floor(Math.log10(max)));
  var vticks = [];
  if(logscale) {
    for(var i=0;i<4;i++) {
      vticks.push(vtickStep);
      vtickStep /= 10;
    }
  } else {
    // this could be between 1 and 10 grid lines - so we adjust to give nicer spacings
    if (vtickStep < (max/5)) {
      vtickStep *= 2;
    } else if (vtickStep > (max/2)) {
      vtickStep /= 2;
    }
    for (var i=vtickStep; i<=max; i+=vtickStep) {
      vticks.push(i);
    }
  }
  vticks.forEach(function(i) {
    var y = scale(i);

    ticks.push('M40,'+y+' L390,'+y);

    var istr = i>=1000000000 ? i/1000000000+'B' : i>=1000000 ? i/1000000+'M' : i>=1000 ? i/1000+'k' : i;
    otherSvg.push('<text x="35" y="'+y+'" font-size="12" font-family="Roboto, Helvetica, sans-serif" text-anchor="end" fill="#fff">'+istr+'</text>');
  });

  paths += '<path d="'+ticks.join(' ')+'" stroke="#fff" opacity="0.3" />;'

  for (var t=0; t<2; t++) {
    var col = t==0 ? COLORS[TEAM_ENL] : COLORS[TEAM_RES];
    if (teamPaths[t].length > 0) {
      paths += '<path d="'+teamPaths[t].join(' ')+'" stroke="'+col+'" />';
    }

    var y = scale(result.gameScore[t]);
    paths += '<path d="M40,'+y+' L390,'+y+'" stroke="'+col+'" stroke-dasharray="3,2" opacity="0.8" />';
  }

  var svg = '<div><svg width="400" height="130">'
           +'<rect x="0" y="0" width="400" height="130" stroke="#FFCE00" fill="#08304E" />'
           +paths
           +otherSvg.join('')
           +'<foreignObject height="18" width="45" y="111" x="0" class="node"><label title="Logarithmic scale">'
           +'<input type="checkbox" class="logscale" style="height:auto;padding:0;vertical-align:middle"'+(logscale?' checked':'')+'/>'
           +'log</label></foreignObject>'
           +'</svg></div>';

  return svg;
}