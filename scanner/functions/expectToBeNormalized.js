function expectToBeNormalized(vnode, desc) {
				expect(vnode, desc).to.have.property('props').with.all.keys(['oninput'].concat(vnode.props.type ? 'type' : [])).and.property('oninput').that.is.a('function');
			}