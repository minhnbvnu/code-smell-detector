async function kickTrustedNode(nodeAddress, voters) {
            // Encode the calldata for the proposal
            let proposalCalldata = web3.eth.abi.encodeFunctionCall(
              {name: 'proposalKick', type: 'function', inputs: [{type: 'address', name: '_nodeAddress'}, {type: 'uint256', name: '_rplFine'}]},
              [nodeAddress, '0']
            );
            // Add the proposal
            let proposalID = await daoNodeTrustedPropose(`Kick ${nodeAddress}`, proposalCalldata, {
                from: registeredNodeTrusted1
            });
            // Current time
            let timeCurrent = await getCurrentTime(web3);
            // Now increase time until the proposal is 'active' and can be voted on
            await increaseTime(web3, (await getDAOProposalStartTime(proposalID)-timeCurrent)+2);
            // Now lets vote
            for (const voter of voters) {
                await daoNodeTrustedVote(proposalID, true, { from: voter });
            }
            // Proposal has passed, lets execute it now
            await daoNodeTrustedExecute(proposalID, { from: registeredNode1 });
        }