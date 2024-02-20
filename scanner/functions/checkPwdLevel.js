function checkPwdLevel(str) {
    let nowLv = 0;
    // if (str.length < 6) {
    //     return nowLv
    // }
    let rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/];
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].test(str)) {
            nowLv++;
        }
    }
    return nowLv;
}