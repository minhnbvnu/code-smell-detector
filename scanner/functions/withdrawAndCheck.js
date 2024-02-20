async function withdrawAndCheck(minipool, withdrawalBalance, from, finalise, expectedUser, expectedNode, userDistribute = false) {
            const withdrawalBalanceBN = withdrawalBalance.ether;
            const expectedUserBN = expectedUser.ether;
            const expectedNodeBN = expectedNode.ether;

            let result

            if (userDistribute) {
                // Send ETH to minipool
                await web3.eth.sendTransaction({
                    from: from,
                    to: minipool.address,
                    value: withdrawalBalanceBN
                });
                // Begin user distribution process
                await beginUserDistribute(minipool, {from});
                // Wait 14 days
                await increaseTime(web3, userDistributeStartTime + 1)
                // Process withdrawal
                result = await withdrawValidatorBalance(minipool, '0'.ether, from, finalise);
            } else {
                // Process withdrawal
                result = await withdrawValidatorBalance(minipool, withdrawalBalanceBN, from, finalise);
            }

            // Check results
            assertBN.equal(expectedUserBN, result.rethBalanceChange, "User balance was incorrect");
            assertBN.equal(expectedNodeBN, result.nodeBalanceChange, "Node balance was incorrect");
        }