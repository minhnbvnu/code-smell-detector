async function testArgsValue() {
                    const value = await inspectById(actual.positional[0].id);
                    QUnit.assert.equal(
                      value.details[1].name,
                      'HTMLDivElement',
                      'in-element args value inspect should be correct'
                    );
                  }