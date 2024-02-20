function getTypeByPoint(score, configs, paperAskDoes, weekAskDoes) {
    let type;
    let config = configs.sort(function (a, b) {
        return a.sort - b.sort;
    });

    let task = new Array();
    task['article'] = false;
    task['video'] = false;
    task['paper'] = false;
    task['week'] = false;
    task['day'] = false;


    for (let key in score) {
        if (!score.hasOwnProperty(key)) {
            continue;
        }
        if (task['article'] == false && (score[key].taskCode.indexOf("1") != -1 || score[key].taskCode.indexOf("1002") != -1)) {
            if (score[key].currentScore < score[key].dayMaxScore) {
                task['article'] = true;
            }
        }
        if (task['video'] == false && score[key].taskCode.indexOf("2") != -1) {
            if (score[key].currentScore < score[key].dayMaxScore) {
                task['video'] = true;
            }
        }
        if (task['video'] == false && score[key].taskCode.indexOf("1003") != -1) {
            if (score[key].currentScore < score[key].dayMaxScore) {
                task['video'] = true;
            }
        }
        if (task['paper'] == false && score[key].taskCode.indexOf("4") != -1) {
            if (paperAskDoes == 0 && score[key].currentScore <= 0) {
                task['paper'] = true;
            }
        }
        if (task['week'] == false && score[key].taskCode.indexOf("5") != -1) {
            if (weekAskDoes == 0 && score[key].currentScore <= 0) {
                task['week'] = true;
            }
        }
        if (task['day'] == false && score[key].taskCode.indexOf("6") != -1) {
            if (score[key].currentScore < score[key].dayMaxScore) {
                task['day'] = true;
            }
        }
    }

    for (let i = 0; i < config.length; i++) {
        if (config[i].flag == true && task[config[i].type] == true) {
            type = config[i].type;
            break;
        }
    }
    return type;
}