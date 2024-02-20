function FavAccordion({ word, index }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    setExpanded((pre) => !pre);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {/* <Typography>{`[${new Date(
          createdAt
        ).toLocaleString()}] ${word}`}</Typography> */}
        <Typography>{`${index + 1}. ${word}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && <DictField word={word} />}
      </AccordionDetails>
    </Accordion>
  );
}