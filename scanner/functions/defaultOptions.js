function defaultOptions(){
  return{
    chars: {
      'top': '─'
      , 'top-mid': '┬'
      , 'top-left': '┌'
      , 'top-right': '┐'
      , 'bottom': '─'
      , 'bottom-mid': '┴'
      , 'bottom-left': '└'
      , 'bottom-right': '┘'
      , 'left': '│'
      , 'left-mid': '├'
      , 'mid': '─'
      , 'mid-mid': '┼'
      , 'right': '│'
      , 'right-mid': '┤'
      , 'middle': '│'
    }
    , truncate: '…'
    , colWidths: []
    , rowHeights: []
    , colAligns: []
    , rowAligns: []
    , style: {
      'padding-left': 1
      , 'padding-right': 1
      , head: ['red']
      , border: ['grey']
      , compact : false
    }
    , head: []
  };
}