function parseConsecutiveLists(list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for UL and vice versa
    var counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm,
      subLists = [],
      result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL(txt) {
        var pos = txt.search(counterRxg);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + '>' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n\n';

          // invert counterType and listType
          listType = (listType === 'ul') ? 'ol' : 'ul';
          counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + '>' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n\n';
        }
      })(list);
      for (var i = 0; i < subLists.length; ++i) {

      }
    } else {
      result = '\n\n<' + listType + '>' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n\n';
    }

    return result;
  }