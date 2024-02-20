function shouldBehaveLikeAccessControlEnumerable() {
  beforeEach(async function () {
    [this.authorized, this.other, this.otherAdmin, this.otherAuthorized] = this.accounts;
  });

  shouldSupportInterfaces(['AccessControlEnumerable']);

  describe('enumerating', function () {
    it('role bearers can be enumerated', async function () {
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.other);
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.otherAuthorized);
      await this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.other);

      const expectedMembers = [this.authorized.address, this.otherAuthorized.address];

      const memberCount = await this.mock.getRoleMemberCount(ROLE);
      const members = [];
      for (let i = 0; i < memberCount; ++i) {
        members.push(await this.mock.getRoleMember(ROLE, i));
      }

      expect(memberCount).to.equal(expectedMembers.length);
      expect(members).to.deep.equal(expectedMembers);
      expect(await this.mock.getRoleMembers(ROLE)).to.deep.equal(expectedMembers);
    });

    it('role enumeration should be in sync after renounceRole call', async function () {
      expect(await this.mock.getRoleMemberCount(ROLE)).to.equal(0);
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.defaultAdmin);
      expect(await this.mock.getRoleMemberCount(ROLE)).to.equal(1);
      await this.mock.connect(this.defaultAdmin).renounceRole(ROLE, this.defaultAdmin);
      expect(await this.mock.getRoleMemberCount(ROLE)).to.equal(0);
    });
  });
}