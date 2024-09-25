import {useState} from "react";
import Input from "../Input";

type NewLabelProps = {
  id: number;
  onAddLabel: (label: string, id: number) => void;
};

const NewLabel: React.FC<NewLabelProps> = ({id, onAddLabel}) => {
  const [label, setLabel] = useState("");
  const [show, setShow] = useState(false);

  const onBlur = () => {
    if (label.trim() !== "") {
      onAddLabel(label, id);
    }
    setShow(false);
    setLabel("");
  };
  return (
    <div className="  flex flex-row ">
      {!show ? (
        <button className="bg-green-300 p-[2px]" onClick={() => setShow(true)}>
          +
        </button>
      ) : null}
      {show ? (
        <Input value={label} setValue={setLabel} onBlur={onBlur} />
      ) : null}
    </div>
  );
};

export default NewLabel;
