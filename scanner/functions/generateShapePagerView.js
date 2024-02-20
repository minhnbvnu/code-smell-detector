function generateShapePagerView (shapeStyle) {
    return () => {
        return (
            <View style={styles.pageContainer} >
                <View style={[styles.shapeBase, shapeStyle]} />
                <View style={styles.mainRec} />
                <View style={styles.subRec} />
                <View style={styles.subRec} />
            </View>
        )
    }
}