function onMouseMove(param) {
            expect(param.type).to.be.eql('mousemove');
            circle.off('mousemove', onMouseMove);
            happen.mousemove(eventContainer, {
                'clientX': point.x + 100,
                'clientY': point.y + 100
            });
        }