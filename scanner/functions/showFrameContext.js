function showFrameContext (frame) {
    var $frameContext = $(frame).find('.frame-context')
    var $context = $frameContext.html()
    $context = $context.trim().length === 0 ? 'Missing stack frames' : $context

    var $line = $frameContext.attr('data-line')
    var $start = $frameContext.attr('data-start')
    var $file = $frameContext.attr('data-file')
    var $method = $frameContext.attr('data-method')
    var $lineColumn = $frameContext.attr('data-line-column')

    $('#code-drop').parent('pre').attr('data-line', $line)
    $('#code-drop').parent('pre').attr('data-start', $start)
    $('#code-drop').parent('pre').attr('data-line-offset', (Number($start) - 1))
    $('#code-drop').html($context)
    $('#frame-file').html($file)
    $('#frame-method').html($method + ' ' + $lineColumn)
    window.Prism.highlightAll()
  }