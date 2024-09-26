export type onSelect = {
  (boxId: number, taskIdOrTask: number | string): void;
};

export type Box = {
  labels: string[];
  id: number;
  tasks?: string[];
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

export enum ACTIONS {
  ADD_BOX = "add_box",
  SELECT_BOX = "select_box",
  ADD_LABEL = "add_label",
  CHANGE_LABEL = "change_label",
  REM_TASK_BOX = "remove_task_box",
  DEL_BOX = "del_box",

  //TASKS,
  ADD_TASK = "add_task",
  DEL_TASK = "del_task",
}
