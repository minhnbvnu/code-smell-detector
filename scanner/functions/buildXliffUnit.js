function buildXliffUnit (id, note, source, target, state = 'initial') {
  return `
<unit id="${id}">
  <notes>
    <note>${note || ''}</note>
  </notes>
  <segment state="${state}">
    <source><![CDATA[${source}]]></source>
    <target><![CDATA[${target || ''}]]></target>
  </segment>
</unit>
  `
}