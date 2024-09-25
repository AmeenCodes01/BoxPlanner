import {useState} from "react";

type BoxLabelInputProps = {
  id: number;
  label: string;
  onChange: (value: string, id: number, label: string) => void;
};

const BoxLabelInput: React.FC<BoxLabelInputProps> = ({id, label, onChange}) => {
  const [value, setValue] = useState(label);

  return (
    <>
      <input
        type="text"
        key={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          value !== label ? onChange(value, id, label) : null;
          setValue(value.trim());
        }}
        className="text-[#00ff48] border-2 border-[#46634e] bg-[#256517] border-t-[3px]  px-[2px] py-[1px] "
        style={{
          width: `${value.length + 1}ch  `,
        }}
      />
    </>
  );
};

export default BoxLabelInput;
