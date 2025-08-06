const LanguageChips = (props) => {
  const style = {
    backgroundColor: props.bg,
    color: props.color,
  };
  return (
    <>
      <span className="chips" style={style}>{props.name}</span>
    </>
  );
};

export default LanguageChips;
