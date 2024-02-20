function setupStats(data)
{
  $("#stats div#all div.detail").hide();
  $("#stats div#all div.row").click(function() {
      $(this).toggleClass('active');
      $(this).find("div.detail").slideToggle("fast");
  });

  ['stray', 'idle'].forEach(function(stat){
    var percent = data[stat+'_p'];
    var selector = '#'+stat;

    if(percent > 25) {
      $(selector).show();
      $(selector+' .label').text(percent+'%');
    }
    else {
      $(selector).hide();
    }
  });

  var location = window.location.pathname == 'presenter' ? '#' : '/#';
  var viewers  = data['viewers'];
  if (viewers) {
    if (viewers.length == 1 && viewers[0][3] == 'current') {
      $("#viewers").removeClass('zoomline');
      $("#viewers").text(I18n.t('stats.allcurrent'));
    }
    else {
      $("#viewers").zoomline({
        max: data['viewmax'],
        data: viewers,
        click: function(element) { window.location = (location + element.attr("data-left")); }
      });
    }
  }

  if (data['elapsed']) {
    $("#elapsed").zoomline({
      max: data['maxtime'],
      data: data['elapsed'],
      click: function(element) { window.location = (location + element.attr("data-left")); }
    });
  }
}