function onRenderEnd() {
                if (!baseRemoved) {
                    if (baseLoaded) {
                        expect(isDrawn(size.width / 2, size.height / 2, map._getRenderer().canvas)).to.be.ok();
                    }
                } else {
                    expect(isDrawn(size.width / 2, size.height / 2, map._getRenderer().canvas)).not.to.be.ok();
                    done();
                }
            }