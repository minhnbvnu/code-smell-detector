function can_await() {
                return (S.in_async === S.in_function
                    || S.in_function === 0 && S.input.has_directive("use strict"));
            }