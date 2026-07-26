import React from "react";
import { useDispatch } from "react-redux";

import {
  deleteStudent,
  setEditingStudent,
} from "../features/students/studentSlice";

const StudentCard = ({ student }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg">
            {student.name}
          </h3>

          <p className="text-gray-500">
            {student.email}
          </p>

          <p className="mt-2 text-sm">
            {student.course}
          </p>

          <p className="text-sm">
            Age: {student.age}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              dispatch(
                setEditingStudent(student)
              )
            }
            className="px-3 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() =>
              dispatch(
                deleteStudent(student.id)
              )
            }
            className="px-3 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;