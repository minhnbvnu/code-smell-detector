function loadDefaultNormalizer(config) {
  // Load the normalizer.
  const normalizer = new MetricNormalizer(config, 'URL')

  // Add in the rules the collector would ship down.
  normalizer.load([
    {
      match_expression:
        '.*\\.(ace|arj|ini|txt|udl|plist|css|gif|ico|jpe?g|js|png|swf|woff|caf|' +
        'aiff|m4v|mpe?g|mp3|mp4|mov)$',
      replacement: '/*.\\1',
      replace_all: false,
      each_segment: false,
      ignore: false,
      terminate_chain: true,
      eval_order: 1000
    },
    {
      match_expression: '^[0-9][0-9a-f_,.-]*$',
      replacement: '*',
      replace_all: false,
      each_segment: true,
      ignore: false,
      terminate_chain: false,
      eval_order: 1001
    },
    {
      match_expression: '^(.*)/[0-9][0-9a-f_,-]*\\.([0-9a-z][0-9a-z]*)$',
      replacement: '\\1/.*\\2',
      replace_all: false,
      each_segment: false,
      ignore: false,
      terminate_chain: false,
      eval_order: 1002
    }
  ])

  return normalizer
}