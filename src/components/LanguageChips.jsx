import { clsx } from "clsx";
const LanguageChips = (props) => {
  const style = {
    backgroundColor: props.bg,
    color: props.color,
  };
  const classChips = clsx("chip", { lost: props.lost });
  return (
    <>
      <span className={classChips} style={style}>
        {props.name}
      </span>
    </>
  );
};

export default LanguageChips;
