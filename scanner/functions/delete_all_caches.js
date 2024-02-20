function delete_all_caches() {

        debug('CACHE: Clearing all unsupported flags');
        debug('CACHE: Flushing all network API caches...');

        return clear_unsupported()
        .then ( function() {return localforage.removeItem('cached_monitors');})
        .then ( function () {return localforage.removeItem('cached_api_version');})
        .then ( function () {return localforage.removeItem('cached_multi_servers');})
        .then ( function () {return localforage.removeItem('cached_multi_port');})
        .then ( function () {return localforage.removeItem('cached_timezone');})
        .then ( function () {return localforage.removeItem('cached_zmgroups');})
        .catch ( function (err) {debug ('Error removing all caches: '+JSON.stringify(err)); return ('error');});
      }