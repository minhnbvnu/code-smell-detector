function onConstantEditorVectorNudge(controlName, type, direction) {
    let field = '';
    let sign = 1;
    
    switch (direction) {
    case '↓': sign = -1; // Fall through
    case '↑': field = type[1]; break;
        
    case '←': sign = -1; // Fall through
    case '→': field = type[0]; break;

    case '↗': sign = -1; // Fall through
    case '↙': field = type[2]; break;
    }

    const textBox = document.getElementById(controlName + '_' + field);
    const nudgeBox = document.getElementById(controlName + '_nudge_' + field);
    const step = $parse(nudgeBox.value).result;
    const newValue = $parse(textBox.value).result + step * sign;
    textBox.value = newValue;
    textBox.onchange();
}