export const getRoleConfig = (role) => {
  const baseConfig = {
    loadData: async (user) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const classLists = JSON.parse(localStorage.getItem("classLists")) || {};
      return { users, classLists };
    }
  };

  // Normalize role - handle both "admin" and "Admin"
  const normalizedRole = role === 'admin' ? 'Admin' : role;

  const roleConfigs = {
    Admin: {
      title: "Admin Control Center",
      subtitle: "System Administration", 
      icon: "⚡",
      layout: "tabs",
      defaultModule: "users",
      modules: [
        { id: "users", label: "User Management", icon: "👥" },
        { id: "assignments", label: "Teacher Assignments", icon: "📚" },
        { id: "roles", label: "Role Management", icon: "🧩" },
        { id: "settings", label: "System Settings", icon: "⚙️" }
      ]
    },

    Principal: {
      title: "Principal Dashboard",
      subtitle: "School Overview & Monitoring",
      icon: "🎓",
      layout: "sections",
      defaultModule: "overview",
      modules: [
        { id: "overview", label: "School Overview", icon: "🏫" },
        { id: "activities", label: "Weekly Activities", icon: "📊" },
        { id: "staff", label: "Staff Overview", icon: "👨‍🏫" },
        { id: "attendance", label: "Attendance", icon: "👥" },
        { id: "exambank", label: "Exam Bank", icon: "📚" }
      ]
    },

    "VP Academic": {
      title: "VP Academic Dashboard",
      subtitle: "Academic Oversight & Resources",
      icon: "📚",
      layout: "sections",
      defaultModule: "materials",
      modules: [
        { id: "materials", label: "Academic Materials", icon: "📖" },
        { id: "attendance", label: "Teacher Attendance", icon: "✅" },
        { id: "lessonplans", label: "Lesson Plans", icon: "📋" },
        { id: "subjects", label: "Subject Assignments", icon: "🎯" },
        { id: "exambank", label: "Exam Bank", icon: "📊" }
      ]
    },

    "VP Admin": {
      title: "VP Admin Dashboard",
      subtitle: "Staff Administration & Communications",
      icon: "⚙️",
      layout: "sections",
      defaultModule: "attendance",
      modules: [
        { id: "attendance", label: "Staff Attendance", icon: "📝" },
        { id: "communications", label: "School Communications", icon: "📢" },
        { id: "calendar", label: "School Calendar", icon: "📅" },
        { id: "exambank", label: "Exam Bank", icon: "📚" }
      ]
    },

    "Form Master": {
      title: "Form Master Dashboard",
      subtitle: "Class Management & Student Oversight",
      icon: "👨‍🏫",
      layout: "sections",
      defaultModule: "students",
      modules: [
        { id: "students", label: "Student Management", icon: "👥" },
        { id: "roster", label: "Duty Roster", icon: "📋" },
        { id: "monitors", label: "Student Monitors", icon: "⭐" },
        { id: "scoring", label: "Score Entry", icon: "✏️" },
        { id: "exambank", label: "Exam Bank", icon: "📊" }
      ]
    },

    "Exam Officer": {
      title: "Exam Officer Dashboard",
      subtitle: "Exam Coordination & Report Generation",
      icon: "📊",
      layout: "sections",
      defaultModule: "reports",
      modules: [
        { id: "reports", label: "Report Printing", icon: "🖨️" },
        { id: "submissions", label: "Exam Submissions", icon: "📥" },
        { id: "tracking", label: "Submission Tracking", icon: "📈" },
        { id: "bulk", label: "Bulk Operations", icon: "⚡" },
        { id: "exambank", label: "Exam Bank", icon: "📚" }
      ]
    },

    "Subject Teacher": {
      title: "Subject Teacher Dashboard",
      subtitle: "Teaching & Student Assessment",
      icon: "✏️",
      layout: "tabs",
      defaultModule: "scoring",
      modules: [
        { id: "scoring", label: "Score Entry", icon: "📝" },
        { id: "assignments", label: "My Assignments", icon: "🎯" },
        { id: "exambank", label: "Exam Bank", icon: "📚" }
      ]
    },

    "Senior Master": {
      title: "Senior Master Dashboard",
      subtitle: "School Operations & Scheduling",
      icon: "⚡",
      layout: "sections",
      defaultModule: "timetable",
      modules: [
        { id: "timetable", label: "Timetable", icon: "📅" },
        { id: "roster", label: "Duty Roster", icon: "🕐" },
        { id: "performance", label: "Performance", icon: "📈" },
        { id: "exambank", label: "Exam Bank", icon: "📊" }
      ]
    },

    Student: {
      title: "Student Dashboard",
      subtitle: "Academic Progress & Attendance",
      icon: "🎒",
      layout: "sections",
      defaultModule: "attendance",
      modules: [
        { id: "attendance", label: "My Attendance", icon: "✅" },
        { id: "scores", label: "My Scores", icon: "📊" },
        { id: "reports", label: "Progress Reports", icon: "📋" },
        { id: "assignments", label: "My Work", icon: "📝" }
      ]
    }
  };

  return roleConfigs[normalizedRole] || roleConfigs.Student;
};
