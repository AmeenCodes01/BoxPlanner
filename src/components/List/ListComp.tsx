import ListRow from "./ListRow.tsx";
import {ListProps} from "../../types.ts";

const List: React.FC<ListProps> = ({items, boxIds, onSelect, boxId, onDel}) => {
  return (
    <div className="w-[100%] ">
      <ul>
        {items?.map((item: string, index: number) => (
          <ListRow
            key={index}
            item={item}
            index={index}
            boxIds={boxIds}
            onSelect={onSelect}
            boxId={boxId}
            onDel={onDel}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
