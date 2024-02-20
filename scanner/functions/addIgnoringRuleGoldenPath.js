function addIgnoringRuleGoldenPath(agent, api, cb) {
  agent.urlNormalizer.load([
    {
      each_segment: true,
      eval_order: 0,
      terminate_chain: false,
      match_expression: '^(test_match_nothing)$',
      replace_all: false,
      ignore: false,
      replacement: '\\1'
    },
    {
      each_segment: true,
      eval_order: 1,
      terminate_chain: false,
      match_expression: '^[0-9][0-9a-f_,.-]*$',
      replace_all: false,
      ignore: false,
      replacement: '*'
    },
    {
      each_segment: false,
      eval_order: 2,
      terminate_chain: false,
      match_expression: '^(.*)/[0-9][0-9a-f_,-]*\\.([0-9a-z][0-9a-z]*)$',
      replace_all: false,
      ignore: false,
      replacement: '\\1/.*\\2'
    }
  ])

  api.addIgnoringRule('^/test/.*')
  const mine = agent.userNormalizer.rules[0]

  cb(mine)
}