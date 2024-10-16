// import { createSlice } from "@reduxjs/toolkit";

// const selectedTestsSlice = createSlice({
//   name: "selectedTests",
//   initialState: [],
//   reducers: {
//     addSelectedTest: (state, action) => {
//       console.log("addSelectedTest", action);
//       state.push(action.payload);
//     },

//     removeSelectedTest: (state, action) => {
//       console.log("removeSelectedTest", action);
//       return state.filter((testId) => testId !== action.payload);
//     },

//     clearSelectedTests: (state) => {
//       console.log("clearSelectedTests", state);
//       return [];
//     },
//   },
// });

// export const { addSelectedTest, removeSelectedTest, clearSelectedTests } =
//   selectedTestsSlice.actions;

// export default selectedTestsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const selectedTestsSlice = createSlice({
  name: "selectedTests",
  initialState: { tests: [], price: 0 },
  reducers: {
    addSelectedTest: (state, action) => {
      console.log(
        "addSelectedTest previous state 1",
        state.tests[0],
        state.price
      );
      console.log(
        "addSelectedTest previous state 2",
        state.tests[1],
        state.price
      );
      console.log(
        "addSelectedTest previous state 3",
        state.tests[2],
        state.price
      );

      const { id, price } = action.payload;
      state.tests.push(id);
      state.price += price;

      console.log("addSelectedTest new state 1", state.tests[0], state.price);
      console.log("addSelectedTest new state 2", state.tests[1], state.price);
      console.log("addSelectedTest new state 3", state.tests[2], state.price);
    },

    removeSelectedTest: (state, action) => {
      console.log("removeSelectedTest action payload", action.payload);
      console.log("removeSelectedTest previous state", state);

      const { id, price } = action.payload;
      state.tests = state.tests.filter((testId) => testId !== id);
      state.price -= price;

      console.log("removeSelectedTest new state", state);
    },

    clearSelectedTests: (state) => {
      console.log("clearSelectedTests previous state", state);

      state.tests = [];
      state.price = 0;

      console.log("clearSelectedTests new state", state);
    },
  },
});

export const { addSelectedTest, removeSelectedTest, clearSelectedTests } =
  selectedTestsSlice.actions;

export default selectedTestsSlice.reducer;
