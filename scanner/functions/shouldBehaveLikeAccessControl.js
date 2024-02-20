function shouldBehaveLikeAccessControl() {
  beforeEach(async function () {
    [this.authorized, this.other, this.otherAdmin] = this.accounts;
  });

  shouldSupportInterfaces(['AccessControl']);

  describe('default admin', function () {
    it('deployer has default admin role', async function () {
      expect(await this.mock.hasRole(DEFAULT_ADMIN_ROLE, this.defaultAdmin)).to.be.true;
    });

    it("other roles's admin is the default admin role", async function () {
      expect(await this.mock.getRoleAdmin(ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
    });

    it("default admin role's admin is itself", async function () {
      expect(await this.mock.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
    });
  });

  describe('granting', function () {
    beforeEach(async function () {
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
    });

    it('non-admin cannot grant role to other accounts', async function () {
      await expect(this.mock.connect(this.other).grantRole(ROLE, this.authorized))
        .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
        .withArgs(this.other, DEFAULT_ADMIN_ROLE);
    });

    it('accounts can be granted a role multiple times', async function () {
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
      expect(this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized)).to.not.emit(
        this.mock,
        'RoleGranted',
      );
    });
  });

  describe('revoking', function () {
    it('roles that are not had can be revoked', async function () {
      expect(await this.mock.hasRole(ROLE, this.authorized)).to.be.false;

      await expect(this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.authorized)).to.not.emit(
        this.mock,
        'RoleRevoked',
      );
    });

    describe('with granted role', function () {
      beforeEach(async function () {
        await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
      });

      it('admin can revoke role', async function () {
        await expect(this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.authorized))
          .to.emit(this.mock, 'RoleRevoked')
          .withArgs(ROLE, this.authorized, this.defaultAdmin);

        expect(await this.mock.hasRole(ROLE, this.authorized)).to.be.false;
      });

      it('non-admin cannot revoke role', async function () {
        await expect(this.mock.connect(this.other).revokeRole(ROLE, this.authorized))
          .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
          .withArgs(this.other, DEFAULT_ADMIN_ROLE);
      });

      it('a role can be revoked multiple times', async function () {
        await this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.authorized);

        expect(this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.authorized)).to.not.emit(
          this.mock,
          'RoleRevoked',
        );
      });
    });
  });

  describe('renouncing', function () {
    it('roles that are not had can be renounced', async function () {
      await expect(this.mock.connect(this.authorized).renounceRole(ROLE, this.authorized)).to.not.emit(
        this.mock,
        'RoleRevoked',
      );
    });

    describe('with granted role', function () {
      beforeEach(async function () {
        await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
      });

      it('bearer can renounce role', async function () {
        await expect(this.mock.connect(this.authorized).renounceRole(ROLE, this.authorized))
          .to.emit(this.mock, 'RoleRevoked')
          .withArgs(ROLE, this.authorized, this.authorized);

        expect(await this.mock.hasRole(ROLE, this.authorized)).to.be.false;
      });

      it('only the sender can renounce their roles', async function () {
        expect(this.mock.connect(this.defaultAdmin).renounceRole(ROLE, this.authorized)).to.be.revertedWithCustomError(
          this.mock,
          'AccessControlBadConfirmation',
        );
      });

      it('a role can be renounced multiple times', async function () {
        await this.mock.connect(this.authorized).renounceRole(ROLE, this.authorized);

        await expect(this.mock.connect(this.authorized).renounceRole(ROLE, this.authorized)).not.to.emit(
          this.mock,
          'RoleRevoked',
        );
      });
    });
  });

  describe('setting role admin', function () {
    beforeEach(async function () {
      await expect(this.mock.$_setRoleAdmin(ROLE, OTHER_ROLE))
        .to.emit(this.mock, 'RoleAdminChanged')
        .withArgs(ROLE, DEFAULT_ADMIN_ROLE, OTHER_ROLE);

      await this.mock.connect(this.defaultAdmin).grantRole(OTHER_ROLE, this.otherAdmin);
    });

    it("a role's admin role can be changed", async function () {
      expect(await this.mock.getRoleAdmin(ROLE)).to.equal(OTHER_ROLE);
    });

    it('the new admin can grant roles', async function () {
      await expect(this.mock.connect(this.otherAdmin).grantRole(ROLE, this.authorized))
        .to.emit(this.mock, 'RoleGranted')
        .withArgs(ROLE, this.authorized, this.otherAdmin);
    });

    it('the new admin can revoke roles', async function () {
      await this.mock.connect(this.otherAdmin).grantRole(ROLE, this.authorized);
      await expect(this.mock.connect(this.otherAdmin).revokeRole(ROLE, this.authorized))
        .to.emit(this.mock, 'RoleRevoked')
        .withArgs(ROLE, this.authorized, this.otherAdmin);
    });

    it("a role's previous admins no longer grant roles", async function () {
      await expect(this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized))
        .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
        .withArgs(this.defaultAdmin, OTHER_ROLE);
    });

    it("a role's previous admins no longer revoke roles", async function () {
      await expect(this.mock.connect(this.defaultAdmin).revokeRole(ROLE, this.authorized))
        .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
        .withArgs(this.defaultAdmin, OTHER_ROLE);
    });
  });

  describe('onlyRole modifier', function () {
    beforeEach(async function () {
      await this.mock.connect(this.defaultAdmin).grantRole(ROLE, this.authorized);
    });

    it('do not revert if sender has role', async function () {
      await this.mock.connect(this.authorized).$_checkRole(ROLE);
    });

    it("revert if sender doesn't have role #1", async function () {
      await expect(this.mock.connect(this.other).$_checkRole(ROLE))
        .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
        .withArgs(this.other, ROLE);
    });

    it("revert if sender doesn't have role #2", async function () {
      await expect(this.mock.connect(this.authorized).$_checkRole(OTHER_ROLE))
        .to.be.revertedWithCustomError(this.mock, 'AccessControlUnauthorizedAccount')
        .withArgs(this.authorized, OTHER_ROLE);
    });
  });

  describe('internal functions', function () {
    describe('_grantRole', function () {
      it('return true if the account does not have the role', async function () {
        await expect(this.mock.$_grantRole(ROLE, this.authorized))
          .to.emit(this.mock, 'return$_grantRole')
          .withArgs(true);
      });

      it('return false if the account has the role', async function () {
        await this.mock.$_grantRole(ROLE, this.authorized);

        await expect(this.mock.$_grantRole(ROLE, this.authorized))
          .to.emit(this.mock, 'return$_grantRole')
          .withArgs(false);
      });
    });

    describe('_revokeRole', function () {
      it('return true if the account has the role', async function () {
        await this.mock.$_grantRole(ROLE, this.authorized);

        await expect(this.mock.$_revokeRole(ROLE, this.authorized))
          .to.emit(this.mock, 'return$_revokeRole')
          .withArgs(true);
      });

      it('return false if the account does not have the role', async function () {
        await expect(this.mock.$_revokeRole(ROLE, this.authorized))
          .to.emit(this.mock, 'return$_revokeRole')
          .withArgs(false);
      });
    });
  });
}