function nimValueFormat(value, fixedLength = 0, withSign = false) {
    let valueFirst = ((value > 0 ? Math.floor : Math.ceil)(value / 1000) / 100).toFixed(2);
    if (withSign && value > 0) valueFirst = `+${valueFirst}`;
    valueFirst = new Array(Math.max(0, fixedLength - valueFirst.length)).join(' ') + valueFirst;
    const valueSecond = ((Math.abs(value) % 1000) / 1000).toFixed(3).substring(2);
    return chalk`{bold ${valueFirst}}${valueSecond} NIM`;
}