function DayNames(t){var o;_classCallCheck(this,DayNames);(o=r.call(this,h,"dayNames",!0)).abbr=(0,u.getInteger)({data:t.abbr,defaultValue:0,validate:function validate(t){return 1===t}});o.day=new l.XFAObjectArray(7);return o}