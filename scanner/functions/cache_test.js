function cache_test(test_function, description) {
      return promise_test(async function () {
        let cache = await create_temporary_cache();
        await test_function(cache);
      }, description);
    }