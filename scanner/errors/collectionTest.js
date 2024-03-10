                segments.forEach((expectedSegment, i) => {
                  const child = current.children[i]

                  t.equal(child.name, expectedSegment, `child should be named ${expectedSegment}`)
                  if (common.MONGO_SEGMENT_RE.test(child.name)) {
                    checkSegmentParams(t, child)
                    t.equal(child.ignore, false, 'should not ignore segment')
                  }

                  if (strict) {
                    t.equal(child.children.length, 0, 'should have no more children')
                  }
                })
            const badMetrics = Object.keys(agent.metrics._metrics.unscoped).filter(function (m) {
              return re.test(m)
            })
            const badMetrics = Object.keys(agent.metrics._metrics.unscoped).filter(function (m) {
              return re.test(m)
            })
                  segments.forEach((expectedSegment, i) => {
                    const child = current.children[i]

                    t.equal(child.name, expectedSegment, `child should be named ${expectedSegment}`)
                    if (common.MONGO_SEGMENT_RE.test(child.name)) {
                      checkSegmentParams(t, child)
                      t.equal(child.ignore, false, 'should not ignore segment')
                    }

                    if (strict) {
                      t.equal(child.children.length, 0, 'should have no more children')
                    }
                  })