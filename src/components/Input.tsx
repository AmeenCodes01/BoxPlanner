type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: () => void;
  onEnter?: () => void;
};

const Input: React.FC<InputProps> = ({value, setValue, onBlur, onEnter}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onEnter ? onEnter() : null;
      onBlur ? onBlur() : null;

      // Add your logic here, e.g., call a function or update state
    }
  };
  return (
    <div className="flex flex-row justify-center w-[100%]">
      {/* Display tasks */}

      {/* Input box */}
      <input
        type="text"
        className=" w-[100%] flex self-center focus:outline-none p-1  bg-[#57A773] -rotate-2 text-[#082015]"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onBlur={onBlur}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
};

export default Input;

// 5 pm, 64%
//6pm 43%
