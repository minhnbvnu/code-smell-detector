function expectToBeUnmodified(vnode, desc) {
				expect(vnode, desc).to.have.property('props').eql({ ...props, ...(vnode.props.type ? { type: vnode.props.type } : {}) });
			}