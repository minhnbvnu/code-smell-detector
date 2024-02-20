async function bankSyncFetch(categories, bankName, username, password){

    let transactionLoad = [];

    switch (bankName){
        case "discover":
            transactionLoad = await discover(username, password);
            break;
        default:
            break;
    }

    return clean(transactionLoad);
}