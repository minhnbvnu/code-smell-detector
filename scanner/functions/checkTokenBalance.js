function checkTokenBalance(balances, expectedBalances) {
            expect(balances.length).to.equal(expectedBalances.length)
            for (let i = 0; i < balances.length; i++) {
                expect(balances[i].toNumber()).to.equal(expectedBalances[i])
            }
        }