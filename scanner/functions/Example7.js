function Example7(){
    const [leo1, setLeo1] = useState('我是leo1')
    const [leo2, setLeo2] = useState('我是leo2')

    return (
        <>
            <button onClick={() => {setLeo1(new Date().getTime())}}>我是leo1</button>
            <button onClick={() => {setLeo2(new Date().getTime() + ' hello')}}>我是leo2</button>
            <ChildComponent name={leo1}>{leo2}</ChildComponent>  
        </>
    )
}