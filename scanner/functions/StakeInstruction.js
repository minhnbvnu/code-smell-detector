function StakeInstruction({ instruction, onOpenAddress }) {
  const { type, data } = instruction;

  return (
    <>
      <Typography
        variant="subtitle1"
        style={{ fontWeight: 'bold' }}
        gutterBottom
      >
        {TYPE_LABELS[type]}
      </Typography>
      {data &&
        Object.entries(data).map(([key, value]) => {
          const dataLabel = DATA_LABELS[key];
          if (!dataLabel) {
            return null;
          }
          const { label, address, transform } = dataLabel;
          return (
            <LabelValue
              key={key}
              label={label + ''}
              value={address ? value?.toBase58() : (transform ? transform(value) : value)}
              link={address}
              onClick={() => address && onOpenAddress(value?.toBase58())}
            />
          );
        })}
    </>
  );
}