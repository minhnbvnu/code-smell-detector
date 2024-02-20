function To_Moz_ForOfStatement(is_await) {
        return function(M) {
            return {
                type: "ForOfStatement",
                await: is_await,
                left: to_moz(M.init),
                right: to_moz(M.object),
                body: to_moz(M.body),
            };
        };
    }