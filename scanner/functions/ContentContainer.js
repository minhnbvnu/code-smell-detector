function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={1}>
        {/* <SummaryContainer /> */}
        <RightColumnContainer />
      </Col>
      <Col className="mainColumnContainer" lg={6}>
        <MainColumnContainer />
      </Col>
      <Col className="rightColumnContainer" lg={1}></Col>
    </>
  );
}