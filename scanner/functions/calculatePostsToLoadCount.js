function calculatePostsToLoadCount() {
            social_networks.forEach(function(network) {
                if (options[network]) {
                    if (options[network].accounts) {
                        posts_to_load_count += options[network].limit * options[network].accounts.length;
                    } else if (options[network].urls ){
                        posts_to_load_count += options[network].limit * options[network].urls.length;
                    } else {
                        posts_to_load_count += options[network].limit;
                    }
                }
            });
        }