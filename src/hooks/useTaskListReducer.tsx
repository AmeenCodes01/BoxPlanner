// import {useReducer} from "react";

// type Box = {
//   labels: string[];
//   id: number;
//   tasks?: string[];
// };

// const ACTIONS = {
//     ADD_BOX: "add_box",
//     SELECT_BOX: "select_box"
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ACTIONS.ADD_BOX:
//       const id =
//         state.boxes.length === 0
//           ? 1
//           : state.boxes[state.boxes.length - 1]?.id + 1;

//       const newBox: Box = {labels: [`box${id}`], id, tasks: []};

//       return {
//         ...state,

//         boxes: [...state.boxes, newBox],
//       };
// case ACTIONS.SELECT_BOX:
//     default:
//       return state;
//   }
// };

// const initialState = {
//   tasks: [],
//   boxes: [],
// };

// export const useTaskListReducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return [state, dispatch];
// };
