import {useState, useEffect} from "react";
import Input from "./components/Input";
import List from "./components/List/ListComp";
import Button from "./components/Button";
// import {useTaskBoxContext} from "./context/TaskBoxContext";
import BoxLabelInput from "./components/BoxLabel/BoxLabelInput";
import NewLabel from "./components/BoxLabel/NewLabel";
import {onSelect, ACTIONS, Box} from "./types";
import {useTaskListReducer} from "./hooks/useTaskListReducer";

function App() {
  const [state, dispatch] = useTaskListReducer();

  // const [tasks, setTasks] = useState<string[]>(() => {
  //   const savedTasks = localStorage.getItem("tasks");
  //   return savedTasks ? (JSON.parse(savedTasks) as string[]) : [];
  // });
  // const [boxes, setBoxes] = useState<Box[]>(() => {
  //   const savedBoxes = localStorage.getItem("boxes");
  //   return savedBoxes ? (JSON.parse(savedBoxes) as Box[]) : [];
  // });
  const [task, setTask] = useState("");
  // const {tasks, setTasks, boxes, setBoxes} = useTaskBoxContext();
  //TaskList functions
  const onAddTask = () => {
    if (task !== "") {
      dispatch({type: ACTIONS.ADD_TASK, task});
      setTask("");
    }
  };

  const onDelTask = (index: number) => {
    dispatch({type: ACTIONS.DEL_TASK, index});
  };

  //Box functions
  const onAddBox = () => {
    dispatch({type: ACTIONS.ADD_BOX});
  };

  const boxIds: number[] = state.boxes.map((b: Box) => b?.id);

  const onSelectBox: onSelect = (boxId, taskIdOrTask) => {
    dispatch({type: ACTIONS.SELECT_BOX, boxId, taskIdOrTask});
  };

  const onAddLabel = (newLabel: string, id: number) => {
    dispatch({type: ACTIONS.ADD_LABEL, id, newLabel});
  };

  const onChangeLabel = (newLabel: string, id: number, oldLabel: string) => {
    dispatch({type: ACTIONS.CHANGE_LABEL, newLabel, id, oldLabel});
  };

  const onRemoveTaskFromBox: onSelect = (boxId, taskIdOrTask) => {
    dispatch({type: ACTIONS.REM_TASK_BOX, boxId, taskIdOrTask});
  };

  const onDelBox = (id: number) => {
    dispatch({type: ACTIONS.DEL_BOX, id});
  };
  //const modifyLabel= onFocus, edit label. add new label.

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(state.boxes));
  }, [state.boxes]);

  return (
    <div className="w-screen h-screen  flex flex-row font-mono overflow-auto bg-[#0b3221] relative  ">
      <div className="border-2 border-[#1e911e]  w-[40%] flex h-[100%] p-2 flex-col ">
        <div className=" overflow-auto">
          {state.tasks.length !== 0 ? (
            <List
              items={state.tasks}
              boxIds={boxIds}
              onSelect={onSelectBox}
              onDel={onDelTask}
            />
          ) : null}
        </div>
        <div className="justify-center self-end m-4 w-[90%] flex flex-row mt-auto ">
          <Input value={task} setValue={setTask} onEnter={onAddTask} />
          <Button onPress={onAddTask} />
        </div>
      </div>
      <div className="border-2  border-[#98FB98]	 w-[60%] h-[100%] overflow-auto flex  p-2">
        {/* Boxes */}
        <div className="self-end justify-self-end absolute bottom-8 right-[50px] z-50 bg-green-950  border-[1px]  border-green-300">
          <Button onPress={onAddBox} />
        </div>
        <ul className=" w-[100%] ">
          {state.boxes.map((box: Box) => (
            <li key={box.id} className="my-[10px] ">
              <div className="flex flex-row space-between justify-between">
                <div>
                  <span className="text-white bg-black text-center  p-[3px] mr-2">
                    {box.id} {"   "}{" "}
                  </span>
                  <button
                    onClick={() => onDelBox(box.id)}
                    className="border-[1px] px-[2px] size-[13px] text-xs bg-red-600   "></button>
                </div>
                <NewLabel id={box.id} onAddLabel={onAddLabel} />
              </div>
              {/* {box.labels.join(", ")}{" "} */}
              <ul className="flex flex-row overflow-auto gap-1">
                {box.labels.map((label) => {
                  return (
                    <BoxLabelInput
                      label={label}
                      id={box.id}
                      key={`${box.id}-${label}`}
                      onChange={onChangeLabel}
                    />
                  );
                })}
              </ul>
              <div className="border-2 border-[#46634e] min-h-[150px] min-w-[100%] p-2">
                <List
                  items={box.tasks}
                  onSelect={onRemoveTaskFromBox}
                  boxId={box.id}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

// boxId from List and index from ListRow sent back to App, added to box.
