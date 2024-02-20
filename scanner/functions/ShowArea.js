function ShowArea(){
    const {color} = useContext(ColorContext)
    return (<div style={{color:color}}>字体颜色：blue</div>)
}