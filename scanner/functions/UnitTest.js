function UnitTest(props) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetData, setData] = useState(``);
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  const openComponent = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setData(``);
    setLoading(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
    setData(``);
    setLoading(false);
    form.resetFields();
  };

  const generate = async () => {
    setLoading(true);
    const data = await form.validateFields();
    try {
      const opt = {};
      if ( props?.temperature || props?.temperature === 0 ) {
        opt.temperature = props?.temperature;
      }
      let result = await chatgptApi(`下面这段代码转换成${data.lan}：${data.target}`, opt);
      setData(result);
    } catch (error) {
      console.log('error', error);
      message.error(`请输入正确格式的数据`)
    }
    setLoading(false);
  };

  return (
    <div className="chatgpt_unit_test">
      <Wrap text={props.title} icon={props.icon} onClick={openComponent}/>
      <Modal
        title={props.title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'完成'}
        footer={<Button type="primary" onClick={handleOk}>完成</Button>}
      >
        <Form
          form={form}
          initialValues={{
            target: ``,
            lan: undefined,
          }}
        >
          <Form.Item name="lan">
            <Select placeholder="选择语言">
              <Select.Option value="javascript">javascript</Select.Option>
              <Select.Option value="typescript">typescript</Select.Option>
              <Select.Option value="go">go</Select.Option>
              <Select.Option value="python">python</Select.Option>
              <Select.Option value="php">php</Select.Option>
              <Select.Option value="c">c</Select.Option>
              <Select.Option value="c#">c#</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="target">
            <Input.TextArea placeholder="请输入内容" rows={8} />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          style={{ marginBottom: "24px" }}
          onClick={generate}
          loading={loading}
        >
          执行
        </Button>
        <Input.TextArea value={targetData} placeholder="结果" rows={8} />
      </Modal>
    </div>
  );
}