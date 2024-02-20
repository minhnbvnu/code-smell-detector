function Example() {
  return (
    <Form onSubmit={onSubmit} autocomplete="off">
      <Select
        field="type"
        label="Would you like a car or truck?"
        gatherData={gatherData}
        gatherOnMount
        initialValue="car">
        <option value="" disabled>
          -Select-
        </option>
        <option value="car">Car</option>
        <option value="truck">Truck</option>
      </Select>
      <ProductSelect />
      <button type="submit">Submit</button>
      <Debug values gathering data />
    </Form>
  );
}