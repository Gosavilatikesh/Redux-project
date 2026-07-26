import React from "react";
import { useSelector } from "react-redux";
import StudentCard from "./StudentCard";

const StudentList = () => {
  const students = useSelector(
    (state) => state.students.students
  );

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
        />
      ))}
    </div>
  );
};

export default StudentList;