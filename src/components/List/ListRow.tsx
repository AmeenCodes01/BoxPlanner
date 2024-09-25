import {useState} from "react";
import Button from "../Button.tsx";
import DropDown from "../DropDown.tsx";

import {ListRowProps} from "../../types.ts";

const ListRow: React.FC<ListRowProps> = ({
  item,
  index,
  boxIds,
  onSelect,
  boxId,
  onDel,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <li
      className="p-2 border-y-[1px] w-[100%] bg-green-900 text-[#80ff31] border-[#FFF275] space-between flex flex-col"
      key={index}>
      <div className="flex flex-row">
        <div>{item}</div>
        <div className="justify-end ml-auto">
          {onDel ? (
            <button
              onClick={() => onDel(index)}
              className="border-[1px] px-[2px] size-[13px] text-xs bg-red-600   "></button>
          ) : null}
          <Button
            onPress={() => {
              if (!boxId) {
                setShowDropDown((prev) => !prev);
              } else {
                onSelect(boxId, item); //this will remove task from box
              }
            }}
          />
        </div>
      </div>
      {showDropDown ? (
        <DropDown
          boxIds={boxIds ? boxIds : []}
          taskId={index}
          onSelect={onSelect}
        />
      ) : null}
    </li>
  );
};

export default ListRow;
