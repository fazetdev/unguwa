// src/pages/Dashboard/roles/FormMasterDashboard.jsx - FIXED
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; 
import { useExam } from "../../../context/ExamContext";
import { Link } from "react-router-dom";

export default function FormMasterDashboard() {
  const { user } = useAuth(); 
  const [activeSection, setActiveSection] = useState(null);

  if (!user) {
    return <div className="p-6">Loading user data...</div>;
  }

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="p-4"> {/* Reduced padding to raise content */}
      <div className="mb-4"> {/* Reduced margin */}
        <h1 className="text-2xl font-bold">Form Master Dashboard</h1>
        <p className="text-gray-600">Welcome, {user.name} - {user.formClass || user.classes?.[0]}</p>
      </div>

      {/* Three Collapsible Buttons - Moved higher */}
      <div className="space-y-4 max-w-2xl">
        {/* Add Student Button */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('add')}
            className="w-full p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg flex justify-between items-center"
          >
            <span className="font-semibold">👥 Add Student</span>
            <span>{activeSection === 'add' ? '▲' : '▼'}</span>
          </button>
          
          {activeSection === 'add' && (
            <div className="p-4 border-t">
              <AddStudentForm />
            </div>
          )}
        </div>

        {/* View Students Button */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('view')}
            className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg flex justify-between items-center"
          >
            <span className="font-semibold">📋 View Students</span>
            <span>{activeSection === 'view' ? '▲' : '▼'}</span>
          </button>
          
          {activeSection === 'view' && (
            <div className="p-4 border-t">
              <StudentListView />
            </div>
          )}
        </div>

        {/* Exam Bank Button */}
        <div className="border border-gray-200 rounded-lg">
          <Link 
            to="/dashboard/exambank"
            className="w-full p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg flex justify-between items-center block"
          >
            <span className="font-semibold">📊 Exam Bank</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add Student Form Component - FIXED with useExam import
function AddStudentForm() {
  const [studentName, setStudentName] = useState("");
  const { user } = useAuth();
  const { initializeStudentScores } = useExam();

  const addStudent = () => {
    if (!studentName.trim()) {
      alert("Please enter student name");
      return;
    }

    const classLevel = user.formClass || user.classes?.[0];
    const studentId = `${classLevel}_${Date.now()}`;
    
    // Save to class list
    const classLists = JSON.parse(localStorage.getItem('classLists')) || {};
    if (!classLists[classLevel]) classLists[classLevel] = [];
    
    const newStudent = {
      id: studentId,
      fullName: studentName.trim(),
      studentId: `STU${Date.now().toString().slice(-4)}`
    };
    
    classLists[classLevel].push(newStudent);
    localStorage.setItem('classLists', JSON.stringify(classLists));
    
    // Create exam bank slots
    initializeStudentScores(studentId, classLevel, studentName.trim());
    
    setStudentName("");
    alert(`Student "${studentName}" added successfully!`);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Enter student full name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        onKeyPress={(e) => e.key === 'Enter' && addStudent()}
      />
      <button
        onClick={addStudent}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Student
      </button>
    </div>
  );
}

// Student List View Component
function StudentListView() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);

  React.useEffect(() => {
    const classLevel = user.formClass || user.classes?.[0];
    const classLists = JSON.parse(localStorage.getItem('classLists')) || {};
    setStudents(classLists[classLevel] || []);
  }, [user]);

  const removeStudent = (studentId) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      const classLevel = user.formClass || user.classes?.[0];
      const classLists = JSON.parse(localStorage.getItem('classLists')) || {};
      
      if (classLists[classLevel]) {
        classLists[classLevel] = classLists[classLevel].filter(s => s.id !== studentId);
        localStorage.setItem('classLists', JSON.stringify(classLists));
        setStudents(classLists[classLevel]);
      }
    }
  };

  // Sort students alphabetically
  const sortedStudents = [...students].sort((a, b) => 
    a.fullName.localeCompare(b.fullName)
  );

  if (sortedStudents.length === 0) {
    return <p className="text-gray-500 text-center py-4">No students added yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Student Name</th>
            <th className="py-2 px-4 border-b text-left">Student ID</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student, index) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{student.fullName}</td>
              <td className="py-2 px-4 border-b">{student.studentId}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => removeStudent(student.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
