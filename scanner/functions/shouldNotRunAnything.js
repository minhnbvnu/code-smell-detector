function shouldNotRunAnything() {
		task1.counter.should.eql(-1);
		task2.counter.should.eql(-1);
		task3.counter.should.eql(-1);
		task4.counter.should.eql(-1);
	}