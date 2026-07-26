import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addStudent,
  updateStudent,
} from "../features/students/studentSlice";

const StudentForm = () => {
  const dispatch = useDispatch();

  const editingStudent = useSelector(
    (state) => state.students.editingStudent
  );

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      dispatch(
        updateStudent({
          ...student,
          id: editingStudent.id,
        })
      );
    } else {
      dispatch(
        addStudent({
          id: Date.now(),
          ...student,
        })
      );
    }

    setStudent({
      name: "",
      email: "",
      age: "",
      course: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold mb-5">
        {editingStudent
          ? "Edit Student"
          : "Add Student"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded-lg"
          placeholder="Student Name"
          value={student.name}
          onChange={(e) =>
            setStudent({
              ...student,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded-lg"
          placeholder="Email"
          value={student.email}
          onChange={(e) =>
            setStudent({
              ...student,
              email: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded-lg"
          placeholder="Age"
          value={student.age}
          onChange={(e) =>
            setStudent({
              ...student,
              age: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded-lg"
          placeholder="Course"
          value={student.course}
          onChange={(e) =>
            setStudent({
              ...student,
              course: e.target.value,
            })
          }
        />
      </div>

      <button
        className="mt-5 bg-slate-900 text-white px-5 py-3 rounded-lg"
      >
        {editingStudent
          ? "Update Student"
          : "Save Student"}
      </button>
    </form>
  );
};

export default StudentForm;