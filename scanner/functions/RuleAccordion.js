function RuleAccordion({ rule, rules }) {
  const i18n = useI18n();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    setExpanded((pre) => !pre);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          sx={{
            opacity: rules ? 1 : 0.5,
            overflowWrap: "anywhere",
          }}
        >
          {rule.pattern === GLOBAL_KEY
            ? `[${i18n("global_rule")}] ${rule.pattern}`
            : rule.pattern}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && <RuleFields rule={rule} rules={rules} />}
      </AccordionDetails>
    </Accordion>
  );
}