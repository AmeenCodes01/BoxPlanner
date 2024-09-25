// import {createContext, useContext, useEffect, useState} from "react";
// export const TaskBoxContext = createContext();

// export const useTaskBoxContext = () => {
//   return useContext(TaskBoxContext);
// };

// type Box = {
//   labels: string[];
//   id: number;
//   tasks?: string[];
// };

// export const TaskBoxProvider = ({children}: {children: React.ReactNode}) => {
//   const [tasks, setTasks] = useState<string[]>(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? (JSON.parse(savedTasks) as string[]) : [];
//   });
//   const [boxes, setBoxes] = useState<Box[]>(() => {
//     const savedBoxes = localStorage.getItem("boxes");
//     return savedBoxes ? (JSON.parse(savedBoxes) as Box[]) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);
//   useEffect(() => {
//     localStorage.setItem("boxes", JSON.stringify(boxes));
//   }, [boxes]);

//   return (
//     <TaskBoxContext.Provider value={{tasks, setTasks, boxes, setBoxes}}>
//       {children}
//     </TaskBoxContext.Provider>
//   );
// };
