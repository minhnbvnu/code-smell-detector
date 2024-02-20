function ApiAccordion({ translator }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    setExpanded((pre) => !pre);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{translator}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && <ApiFields translator={translator} />}
      </AccordionDetails>
    </Accordion>
  );
}