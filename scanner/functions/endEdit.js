function endEdit() {
                var symbol = label._getInternalSymbol(),
                    font = maptalks.StringUtil.getFont(symbol);
                var spacing = symbol['textLineSpacing'] || 0;
                var h = maptalks.StringUtil.stringLength('test', font).height;
                var expected = h * 2 + spacing;
                expect(label.getSize()['height'] >= expected).to.be.ok();
            }