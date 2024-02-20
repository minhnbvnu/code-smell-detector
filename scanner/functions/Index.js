function Index(props) {
    
    return (
        <Layout
            title="ImgSquash - Compress Images to smallest size"
            metaDescription="Free online image compressor for jpeg and png images with bulk compression and parallel uploading. Upto 70% reduction in original while maintaining quality.">
            {/* <Dropzone /> */}
            {/* <CompressedResult /> */}
            {props.stage === 0 ? <Dropzone /> : <CompressedResult />}
            <HowToCompress />
            <Features />
        </Layout>
    )
}