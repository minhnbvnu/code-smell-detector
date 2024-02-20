function addFilterChain(){
            var filterChain = FilterChain(filters);
            filterChain.output().connect(lowPassfilter);
            filterChains.push(filterChain);
        }