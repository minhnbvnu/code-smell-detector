async function slashAndCheck(from, expectedSlash) {
            // Get contracts
            const rocketNodeStaking = await RocketNodeStaking.deployed()
            const rplStake1 = await rocketNodeStaking.getNodeRPLStake(node)
            await minipool.slash({from: from})
            const rplStake2 = await rocketNodeStaking.getNodeRPLStake(node)
            const slashedAmount = rplStake1.sub(rplStake2)
            assertBN.equal(expectedSlash, slashedAmount, 'Slashed amount was incorrect')
        }