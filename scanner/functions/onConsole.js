function onConsole(line) {
                if (line === 'pass' || line === 'fail') {
                    context.spooky.removeListener('console', onConsole);
                    expect(line).to.be('pass');
                    done();
                    return;
                }
            }