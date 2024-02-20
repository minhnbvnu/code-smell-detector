function buildChartData(){

    var pools = {};

    poolKeys = [];
    for (var i = 0; i < statData.length; i++){
        for (var pool in statData[i].pools){
            if (poolKeys.indexOf(pool) === -1)
                poolKeys.push(pool);
        }
    }


    for (var i = 0; i < statData.length; i++){

        var time = statData[i].time * 1000;

        for (var f = 0; f < poolKeys.length; f++){
            var pName = poolKeys[f];
            var a = pools[pName] = (pools[pName] || {
                hashrate: [],
                workers: [],
                blocks: []
            });
            if (pName in statData[i].pools){
                a.hashrate.push([time, statData[i].pools[pName].hashrate]);
                a.workers.push([time, statData[i].pools[pName].workerCount]);
                a.blocks.push([time, statData[i].pools[pName].blocks.pending])
            }
            else{
                a.hashrate.push([time, 0]);
                a.workers.push([time, 0]);
                a.blocks.push([time, 0])
            }

        }

    }

    poolWorkerData = [];
    poolHashrateData = [];
    poolBlockData = [];

    for (var pool in pools){
        poolWorkerData.push({
            key: pool,
            values: pools[pool].workers
        });
        poolHashrateData.push({
            key: pool,
            values: pools[pool].hashrate
        });
        poolBlockData.push({
            key: pool,
            values: pools[pool].blocks
        })
    }
}