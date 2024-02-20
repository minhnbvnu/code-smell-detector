function humanize_key(key){
        if (key.length === 1){
            return key.toUpperCase();
        }

        key = humanize_map[key.toLowerCase()]||key;
        
        if (key.indexOf(',') === -1){
            return  ( special_case[key] ? special_case[key] : key.charAt(0).toUpperCase() + key.slice(1) );
        }
    }