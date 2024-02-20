function $deep_clone(a, map, is_map_asset, makeImmutable) {
    if (! a || (a.$type !== undefined && a.$type !== 'map')) {
        // Built-in; return directly instead of cloning since it is
        // immutable (this is based on the assumption that quadplay
        // makes frozen recursive, which it does).
        return a;
    } else if (Array.isArray(a)) {
        let x = map.get(a);
        if (x !== undefined) {
            // Already cloned
            return x;
        } else {
            // Clone the array structure and store the new value in
            // the memoization map
            map.set(a, x = a.slice(0));

            if (is_map_asset === undefined) {
                is_map_asset = (a.$type === 'map');
            }

            // Clone array elements
            for (let i = 0; i < x.length; ++i) {
                x[i] = $deep_clone(x[i], map, is_map_asset, makeImmutable);
            }
            
            // Clone all non-Array properties that might have been
            // added to this array.  They are distinguished by
            // names that are not numbers.
            const k = $Object.keys(a);
            for (let i = 0; i < k.length; ++i) {
                const key = k[i];
                if (key[0] > '9' || key[0] < '0') {
                    if ((key === '$name') && (a.$name[0] !== '«')) {
                        x[key] = '«cloned ' + a.$name + '»';
                    } else {
                        x[key] = $deep_clone(a[key], map, is_map_asset, makeImmutable);
                    }
                }
            }

            if (makeImmutable) { Object.freeze(x); }

            if (is_map_asset) {
                if ($Object.isSealed(a)) { $Object.seal(x); }
                if ($Object.isFrozen(a)) { $Object.freeze(x); }
            }

            return x;
        }
    } else if (typeof a === 'object') {
        $console.assert(a.$type === undefined);
        
        let x = map.get(a);
        if (x !== undefined) {
            // Already cloned
            return x;
        } else {
            map.set(a, x = a.constructor ? a.constructor() : $Object.create(null));
            const k = $Object.keys(a);
            for (let i = 0; i < k.length; ++i) {
                const key = k[i];
                if (key === '$name') {
                    if (a.$name[0] !== '«') {
                        x.$name = '«cloned ' + a.$name + '»';
                    } else {
                        x.$name = a.$name;
                    }
                } else {
                    x[key] = $deep_clone(a[key], map, is_map_asset, makeImmutable);
                }
            }
            
            if (makeImmutable) {
                // Precompute for colors to speed particle systems
                if ((x.r === undefined && x.g === undefined && x.b === undefined) ||
                    (x.h === undefined && x.s === undefined && x.v === undefined)) {
                    x.$color = $colorToUint16(x);
                }
                
                Object.freeze(x);
            }

            if (a.$name && $Object.isSealed(a)) { $Object.seal(x); }
            return x;
        }
    } else {
        // Other primitive; just return the value
        return a;
    }
}