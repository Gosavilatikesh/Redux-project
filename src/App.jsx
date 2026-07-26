import React from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Student Management System
          </h1>

          <p className="text-slate-500 mt-2">
            Manage student records efficiently.
          </p>
        </div>

        <StudentForm />

        <StudentList />
      </div>
    </div>
  );
}

export default App;