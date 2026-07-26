import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  editingStudent: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },

    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },

    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }

      state.editingStudent = null;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  setEditingStudent,
  updateStudent,
} = studentSlice.actions;

export default studentSlice.reducer;