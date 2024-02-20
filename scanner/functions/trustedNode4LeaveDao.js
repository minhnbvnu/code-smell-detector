async function trustedNode4LeaveDao() {
            // Wait enough time to do a new proposal
            await increaseTime(web3, proposalCooldown);
            // Encode the calldata for the proposal
            let proposalCallData = web3.eth.abi.encodeFunctionCall(
              {name: 'proposalLeave', type: 'function', inputs: [{type: 'address', name: '_nodeAddress'}]},
              [trustedNode4]
            );
            // Add the proposal
            let proposalId = await daoNodeTrustedPropose('hey guys, can I please leave the DAO?', proposalCallData, {
                from: trustedNode4
            });
            // Current block
            let timeCurrent = await getCurrentTime(web3);
            // Now mine blocks until the proposal is 'active' and can be voted on
            await increaseTime(web3, (await getDAOProposalStartTime(proposalId)-timeCurrent)+2);
            // Now lets vote
            await daoNodeTrustedVote(proposalId, true, { from: trustedNode1 });
            await daoNodeTrustedVote(proposalId, true, { from: trustedNode2 });
            await daoNodeTrustedVote(proposalId, true, { from: trustedNode3 });
            // Fast forward to this voting period finishing
            timeCurrent = await getCurrentTime(web3);
            await increaseTime(web3, (await getDAOProposalEndTime(proposalId)-timeCurrent)+2);
            // Proposal should be successful, lets execute it
            await daoNodeTrustedExecute(proposalId, { from: trustedNode1 });
            // Member can now leave and collect any RPL bond
            await daoNodeTrustedMemberLeave(trustedNode4, { from: trustedNode4 });
        }