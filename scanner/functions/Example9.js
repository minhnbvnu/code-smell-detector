function Example9(){
    const size = useWinSize()

    return (
        <div>
            页面尺寸：{size.width} * {size.height}
        </div>
    )
}