async function getCurrentTime(web3) {
    return (await web3.eth.getBlock('latest')).timestamp
}