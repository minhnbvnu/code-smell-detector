function remove_cases_access_from_user_table(org_id, rows) {
    cases = [];
    for (cid in rows) {
        cases.push(rows[cid].case_id);
    }
    remove_cases_access_user(org_id, cases);
}