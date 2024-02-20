function DatePicker({ updateGraph, selectFilter }) {
  const [selectedDay, changeSelectedDay] = useState(new Date());
  const [isDayPickerVisible, changeDayPickerVisibility] = useState(false);

  const toggleDayPickerVisibility = () => changeDayPickerVisibility(!isDayPickerVisible);

  function handleDayClick(date, modifiers) {

    // Do not proceed with click action if the date is disabled
    if(modifiers.disabled){
      return;
    }

    toggleDayPickerVisibility();

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }

    const newDate = formatDate(date)

    if (formatDate(selectedDay) !== newDate) {
      console.log(newDate)
      changeSelectedDay(date)

      const apiURL =
        'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/patientdb/' +
        newDate

      fetch(apiURL, {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
      })
        .then(resp => resp.json())
        .then(res => {
          console.log(res)
          // Update the graph only if res.success is true
          if(res.success){
            updateGraph(rowsToGraph(res.data.rawPatientData))
            selectFilter('P2P');
          }
        })
    }
  }

  const renderDayPicker = () => isDayPickerVisible ? (
    <DayPicker
      selectedDays={selectedDay}
      onDayClick={handleDayClick}
      disabledDays={[
        {
          before: new Date(2020, 2, 23),
          after: new Date(),
        },
      ]}
    />
  ) : null

  return (
    <Container>
      {isBrowser ? (
        <>
          {renderDayPicker()}
          <DatePickerButton
            onClick={toggleDayPickerVisibility}
          >
            <span>{selectedDay.toDateString()}</span>
          </DatePickerButton>
        </>
      ) : null}
    </Container>
  )
}