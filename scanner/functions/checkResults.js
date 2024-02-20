function checkResults() {
    expect(errorResults).to.deep.equal([
      [],
      [
        {
          name: 'sub',
          type: 'required',
          value: undefined
        },
        {
          name: 'sub.foo',
          type: 'required',
          value: undefined
        }
      ],
    ]);
    done();
  }