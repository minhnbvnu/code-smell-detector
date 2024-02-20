function _resolve_root_elements(item) {
        const roots = [];
        if (item.root_ids != null && item.roots != null) {
            for (const root_id of item.root_ids)
                roots.push(_get_element(item.roots[root_id]));
        }
        return roots;
    }