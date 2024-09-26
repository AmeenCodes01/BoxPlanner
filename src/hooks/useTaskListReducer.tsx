import {useReducer} from "react";

interface Box {
  labels: string[];
  id: number;
  tasks: string[];
}

interface State {
  tasks: string[];
  boxes: Box[];
}

enum ACTIONS {
  ADD_BOX = "add_box",
  SELECT_BOX = "select_box",
  ADD_LABEL = "add_label",
  CHANGE_LABEL = "change_label",
  REM_TASK_BOX = "remove_task_box",
  DEL_BOX = "del_box",
  ADD_TASK = "add_task",
  DEL_TASK = "del_task",
}

interface SelectBoxAction {
  boxId: number;
  taskIdOrTask: number | string;
  type: ACTIONS.SELECT_BOX;
}

interface AddLabelAction {
  id: number;
  newLabel: string;
  type: ACTIONS.ADD_LABEL;
}

interface ChangeLabelAction {
  newLabel: string;
  id: number;
  oldLabel: string;
  type: ACTIONS.CHANGE_LABEL;
}

interface RemoveTaskFromBoxAction {
  boxId: number;
  taskIdOrTask: number | string;
  type: ACTIONS.REM_TASK_BOX;
}

interface DelBoxAction {
  id: number;
  type: ACTIONS.DEL_BOX;
}

interface AddTaskAction {
  task: string;
  type: ACTIONS.ADD_TASK;
}

interface DelTaskAction {
  index: number;
  type: ACTIONS.DEL_TASK;
}

type Action =
  | SelectBoxAction
  | AddLabelAction
  | ChangeLabelAction
  | RemoveTaskFromBoxAction
  | DelBoxAction
  | AddTaskAction
  | DelTaskAction
  | {type: ACTIONS.ADD_BOX};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.ADD_BOX:
      const id =
        state.boxes.length === 0
          ? 1
          : state.boxes[state.boxes.length - 1]?.id + 1;

      const newBox: Box = {labels: [`box${id}`], id, tasks: []};

      return {
        ...state,
        boxes: [...state.boxes, newBox],
      };
    case ACTIONS.SELECT_BOX:
      let newBoxes = [...state.boxes];
      if (typeof action.taskIdOrTask === "number") {
        const selectedTask = state.tasks[action.taskIdOrTask];

        newBoxes = state.boxes.map((box: Box) => {
          if (box.id === action.boxId) {
            return {...box, tasks: [...(box.tasks || []), selectedTask]};
          }
          return box;
        });
      }
      const newTasks: string[] = state.tasks.filter(
        (_, i: number) => i !== action.taskIdOrTask
      );

      return {
        ...state,
        tasks: newTasks,
        boxes: newBoxes,
      };

    case ACTIONS.ADD_LABEL:
      const updatedBoxes = state.boxes.map((box: Box) => {
        if (box.id === action.id) {
          return {...box, labels: [...box.labels, action.newLabel.trim()]};
        }
        return box;
      });
      return {
        ...state,
        boxes: updatedBoxes,
      };

    case ACTIONS.CHANGE_LABEL:
      const changedBoxes = state.boxes.map((box: Box) => {
        if (box.id === action.id) {
          const updatedLabels = box.labels
            .map((label) =>
              label === action.oldLabel ? action.newLabel.trim() : label.trim()
            )
            .filter((label) => label !== ""); // Remove empty labels
          return {...box, labels: updatedLabels};
        }
        return box;
      });
      return {
        ...state,
        boxes: changedBoxes,
      };

    case ACTIONS.REM_TASK_BOX:
      const newBoxes1 = state.boxes.map((box: Box) => {
        if (box.id === action.boxId) {
          const updatedTasks = box.tasks?.filter(
            (t) => t !== action.taskIdOrTask
          );
          return {...box, tasks: updatedTasks};
        }
        return box;
      });

      return {
        ...state,
        boxes: newBoxes1,
        tasks:
          typeof action.taskIdOrTask === "string"
            ? [...state.tasks, action.taskIdOrTask]
            : state.tasks,
      };

    case ACTIONS.DEL_BOX:
      return {
        ...state,
        boxes: state.boxes.filter((box: Box) => box.id !== action.id),
      };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case ACTIONS.DEL_TASK:
      const updatedTasks = state.tasks.filter(
        (_, i: number) => i !== action.index
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};

const initFromLocalStorage = (): State => {
  const savedTasks = localStorage.getItem("tasks");
  const savedBoxes = localStorage.getItem("boxes");

  return {
    tasks: savedTasks ? JSON.parse(savedTasks) : [],
    boxes: savedBoxes ? JSON.parse(savedBoxes) : [],
  };
};

const initialState: State = {
  tasks: [],
  boxes: [],
};

export const useTaskListReducer = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initFromLocalStorage
  );
  return [state, dispatch] as const;
};
