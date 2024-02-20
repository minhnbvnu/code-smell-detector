function h24Vm(d = new Date()) {
  return createWrapper(
    '<div><time-picker v-model="time" :show-meridian="false"/></div>',
    {
      time: d,
    }
  );
}