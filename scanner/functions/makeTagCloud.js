function makeTagCloud(tagInfo)
{
    var output = '<div class="tagCloud" style="width: 100%">';

    tagInfo.sort(function(a, b) { if (a.tag < b.tag) { return -1; } else if (a.tag == b.tag) { return 0; } else return 1; });

  /* BEGIN LOOP */
    for (var i = 0; i < tagInfo.length; i++) {
        var tag = tagInfo[i].tag;

        var validates = true;
  /* BEGIN LOOP */
        for (var j = 0; j < tag.length; j++) {
            var ch = tag.charCodeAt(j);
            if (ch < 0x20 || ch >= 0x7f) {
                validates = false;
                break;
            }
        }
  /* END LOOP */

        if (!validates)
            continue;

        var url = "http://example.com/tag/" + tag.replace(" ", "").toLowerCase();
        var popularity = tagInfo[i].popularity;
        var color = 'rgb(' + Math.floor(255 * (popularity - 12) / 20) + ', 0, 255)';
        output += ' <a href="' + url + '" style="font-size: ' + popularity + 'px; color: ' + color + '">' + tag + '</a> \n';
    }
  /* END LOOP */

    output += '</div>';
    output.replace(" ", "&nbsp;");

    return output;
}