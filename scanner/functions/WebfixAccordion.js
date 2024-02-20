function WebfixAccordion({ rule, webfix }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    setExpanded((pre) => !pre);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          sx={{
            opacity: webfix ? 1 : 0.5,
            overflowWrap: "anywhere",
          }}
        >
          {rule.pattern}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && <WebfixFields rule={rule} webfix={webfix} />}
      </AccordionDetails>
    </Accordion>
  );
}