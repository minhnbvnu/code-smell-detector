async function expectMembersMatch(methods, values) {
    expect(await methods.length()).to.equal(values.length);
    for (const value of values) expect(await methods.contains(value)).to.be.true;

    expect(await Promise.all(values.map((_, index) => methods.at(index)))).to.have.deep.members(values);
    expect([...(await methods.values())]).to.have.deep.members(values);
  }