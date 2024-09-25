export type onSelect = {
  (boxId: number, taskIdOrTask: number | string): void;
};

export interface ListProps {
  boxIds?: number[];
  boxId?: number;
  onDel?: (index: number) => void;
  onSelect: onSelect;
  items: string[] | undefined | null;
}

export interface ListRowProps extends Omit<ListProps, "items"> {
  item: string;
  index: number;
}
