function nextSample() {
            const sample2 = data[1]
            t.equal(sample2[0], 'FakeTransaction', 'should match transaction name')
            t.equal(sample2[1], '<unknown>', 'should match transaction url')
            t.equal(sample2[2], 487602586913804700, 'should match query id')
            t.equal(sample2[3], 'drop table users', 'should match raw query')
            t.equal(sample2[4], 'FakeSegment', 'should match segment name')
            t.equal(sample2[5], 1, 'should have 1 call')
            t.equal(sample2[6], 550, 'should match total')
            t.equal(sample2[7], 550, 'should match min')
            t.equal(sample2[8], 550, 'should match max')

            codec.decode(sample2[9], function decoded(error, result) {
              t.equal(error, null, 'should not error')

              const keys = Object.keys(result)

              t.same(keys, ['backtrace'])
              t.same(result.backtrace, 'fake stack', 'trace should match')
              t.end()
            })
          }