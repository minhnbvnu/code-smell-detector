function handleInput(event) {
        
        if(numberState<=0){
            setNumberState(0);
        }
        setNumberState(event.target.value);
    }