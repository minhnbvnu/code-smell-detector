function checkHasUI(){
        if(!UE.ui){
            alert(lang.autofloatMsg);
            return 0;
        }
        return 1;
    }