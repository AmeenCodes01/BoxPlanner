//will show box indexes.

type DropDownProps = {
  boxIds: number[];
  taskId: number;
  onSelect: (taskId: number, id: number) => void;
};

const DropDown: React.FC<DropDownProps> = ({boxIds, taskId, onSelect}) => {
  return (
    <div className="bg-green-950 border-[1px] p-[2px] right-0  top-0 z-50  ">
      <ul className="flex flex-row">
        {boxIds?.map((id: number) => (
          <li
            key={id}
            className="p-[5px] border-x-[2px] border-green-800 border-y-[1px]">
            <button onClick={() => onSelect(id, taskId)}> {id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DropDown;
