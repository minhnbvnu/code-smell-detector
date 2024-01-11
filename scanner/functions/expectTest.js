function expectTest(){
                    expect(geometry._minAlt).to.be.equal(undefined);
                    expect(geometry._maxAlt).to.be.equal(undefined);
                     //cache alt
                    geometry.getContainerExtent();
                }