function allocQuery() {
                return queryPool.pop() || extensions.ext_disjoint_timer_query.createQueryEXT();
            }