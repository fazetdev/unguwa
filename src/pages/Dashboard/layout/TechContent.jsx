import React from "react";

// Import your real admin components
import UserManagementPanel from "../roles/UserManagementPanel";
import TeacherAssignmentPanel from "../roles/TeacherAssignmentPanel";
import RoleManagementPanel from "../roles/RoleManagementPanel";
import SystemSettings from "../roles/SystemSettings";

const TechContent = ({ config, activeModule, user, dashboardData }) => {
  console.log("TechContent rendering with activeModule:", activeModule);

  if (!activeModule) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Module</h3>
        <p className="text-gray-600">Choose a tab above to get started</p>
      </div>
    );
  }

  const renderModuleContent = () => {
    console.log("Rendering module:", activeModule);
    
    switch (activeModule) {
      case "users":
        return <UserManagementPanel users={dashboardData.users} onUsersUpdate={() => window.location.reload()} />;
      case "assignments":
        return <TeacherAssignmentPanel users={dashboardData.users} onUsersUpdate={() => window.location.reload()} />;
      case "roles":
        return <RoleManagementPanel users={dashboardData.users} onUsersUpdate={() => window.location.reload()} />;
      case "settings":
        return <SystemSettings />;
      default:
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Module Under Development</h3>
            <p className="text-gray-600">{activeModule} content coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {renderModuleContent()}
    </div>
  );
};

export default TechContent;
