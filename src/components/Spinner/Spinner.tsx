import "./Spinner.css";

export const Spinner = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return <div className={"loader"}></div>;
};
