function remove_group_cases_from_group_table(group_id, rows) {
    cases = [];
    for (cid in rows) {
        cases.push(rows[cid].case_id);
    }
    remove_cases_access_group(group_id, cases);
}