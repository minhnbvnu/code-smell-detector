function scrollAssertions() {
		expect(execute.calledOnce).to.be.true;
		expect(waitFor.calledOnce).to.be.true;
		execute.reset();
		waitFor.reset();
	}