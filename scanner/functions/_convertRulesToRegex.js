function _convertRulesToRegex(rules) {
  return (
    '(?:' +
    rules
      .sort(function ruleSorter(a, b) {
        // Step 1) Sort the rules according to match-ability. This way the regex
        // will test the rules with the highest possible strength before weaker rules.

        if (a[a.length - 1] !== '*') {
          // If `a` is an exact rule, it should be moved up.
          return -1
        } else if (b[b.length - 1] !== '*') {
          // If `b` is an exact rule and `a` is not, `b` should be moved up.
          return 1
        }

        // Both `a` and `b` are wildcard rules, so the rule with greater length
        // should be moved up.
        return b.length - a.length
      })
      .map(function ruleSplitter(rule) {
        // Step 2) Escape regex special characters and split the rules into arrays.

        // 'foo.bar' => ['foo', 'bar']
        // 'foo.bang*' => ['foo', 'bang\\*']
        // 'fizz.bang' => ['fizz', 'bang']
        // '*' => ['\\*']
        return rule
          .replace(/([.*+?|\\^$()\[\]])/g, function cleaner(m) {
            return '\\' + m
          })
          .split('.')
      })
      .reduce(function ruleTransformer(collection, ruleParts) {
        // Step 3) Merge the split rules into a single nested array, deduplicating
        // rule sections as we go.

        // ['foo', 'bar'] => [['foo\\.', ['bar']]]
        // ['foo', 'bang\\*'] => [['foo\\.', ['bar'], ['bang']]]
        // ['fizz', 'bang'] => [['foo\\.', ['bar'], ['bang']], ['fizz\\.', ['bang']]]
        // ['\\*'] => [['foo\\.', ['bar'], ['bang']], ['fizz\\.', ['bang']], ['']]
        add(collection, ruleParts, 0)
        return collection
        function add(c, r, i) {
          let v = r[i]
          if (i !== r.length - 1) {
            v += '.'
          } else if (/\\\*$/.test(v)) {
            v = v.substr(0, v.length - 2)
          }

          const idx = c.findIndex(function findV(a) {
            return a[0] === v
          })
          let part = c[idx]

          if (idx === -1) {
            part = [v]
            c.push(part)
          }
          if (i !== r.length - 1) {
            add(part, r, i + 1)
          }
        }
      }, [])
      .map(function rulesToRegex(part) {
        // Step 4) Merge each of the transformed rules into a regex.

        // ['foo\\.', ['bar', 'bang']] => 'foo\\.(?:bar|bang)'
        // ['fizz\\.', ['bang']] => 'fizz\\.(?:bang)'
        // [''] => ''
        return mapper(part)
        function mapper(p) {
          if (typeof p === 'string') {
            return p
          } else if (p.length === 1) {
            return mapper(p[0])
          }
          const first = mapper(p.shift()) // shift === pop_front
          return first + '(?:' + p.map(mapper).join('|') + ')'
        }
      })
      .join('|') +
    ')'
  ) // Step 5) Merge all the regex strings into one.
}