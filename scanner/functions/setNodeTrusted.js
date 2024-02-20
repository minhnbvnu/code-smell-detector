async function setNodeTrusted(_account, _id, _url, owner) {
    // Mints fixed supply RPL, burns that for new RPL and gives it to the account
    let rplMint = async function(_account, _amount) {
        // Load contracts
        const rocketTokenRPL = await RocketTokenRPL.deployed();
        // Convert
        _amount = web3.utils.toWei(_amount.toString(), 'ether');
        // Mint RPL fixed supply for the users to simulate current users having RPL
        await mintDummyRPL(_account, _amount, { from: owner });
        // Mint a large amount of dummy RPL to owner, who then burns it for real RPL which is sent to nodes for testing below
        await allowDummyRPL(rocketTokenRPL.address, _amount, { from: _account });
        // Burn existing fixed supply RPL for new RPL
        await burnFixedRPL(_amount, { from: _account }); 
    }
    
    // Allow the given account to spend this users RPL
    let rplAllowanceDAO = async function(_account, _amount) {
        // Load contracts
        const rocketTokenRPL = await RocketTokenRPL.deployed();
        const rocketDAONodeTrustedActions = await RocketDAONodeTrustedActions.deployed()
        // Convert
        _amount = web3.utils.toWei(_amount.toString(), 'ether');
        // Approve now
        await rocketTokenRPL.approve(rocketDAONodeTrustedActions.address, _amount, { from: _account });
    }

    // Get the DAO settings
    let daoNodesettings = await RocketDAONodeTrustedSettingsMembers.deployed();
    // How much RPL is required for a trusted node bond?
    let rplBondAmount = web3.utils.fromWei(await daoNodesettings.getRPLBond());
    // Mint RPL bond required for them to join
    await rplMint(_account, rplBondAmount);
    // Set allowance for the Vault to grab the bond
    await rplAllowanceDAO(_account, rplBondAmount);
    // Create invites for them to become a member
    await setDaoNodeTrustedBootstrapMember(_id, _url, _account, {from: owner});
    // Now get them to join
    await daoNodeTrustedMemberJoin({from: _account});
    // Check registration was successful and details are correct
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    const id = await rocketDAONodeTrusted.getMemberID(_account);
    assert(id === _id, "Member ID is wrong");
    const url = await rocketDAONodeTrusted.getMemberUrl(_account);
    assert(url === _url, "Member URL is wrong");
    const joinedTime = await rocketDAONodeTrusted.getMemberJoinedTime(_account);
    assert(!joinedTime.eq(0), "Member joined time is wrong");
    const valid = await rocketDAONodeTrusted.getMemberIsValid(_account);
    assert(valid, "Member valid flag is not set");
}