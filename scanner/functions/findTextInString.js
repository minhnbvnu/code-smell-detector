function findTextInString(textContent,opt,currentIndex){
        var str = opt.searchStr;
        if(opt.dir == -1){
            textContent = textContent.split('').reverse().join('');
            str = str.split('').reverse().join('');
            currentIndex = textContent.length - currentIndex;

        }
        var reg = new RegExp(str,'g' + (opt.casesensitive ? '' : 'i')),match;

        while(match = reg.exec(textContent)){
            if(match.index >= currentIndex){
                return opt.dir == -1 ? textContent.length - match.index - opt.searchStr.length : match.index;
            }
        }
        return  -1
    }