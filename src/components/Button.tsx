type ChildProps = {
  onPress: () => void; // Define the type for the onPress prop
};

const Button: React.FC<ChildProps> = ({onPress}) => {
  return (
    <button className="self-center text-[#80ff31] " onClick={onPress}>
      [¬/]
    </button>
  );
};

export default Button;
