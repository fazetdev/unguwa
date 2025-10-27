import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

// Layout Components
import TopBar from "./layout/TopBar";
import WelcomeSection from "./layout/WelcomeSection";
import ProfileSummary from "./layout/ProfileSummary";

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const toggleDetails = () => setDetailsExpanded((prev) => !prev);

    const handleProfileNavigation = () => {
        setDetailsExpanded(true);
        navigate("/dashboard/profile");
    };

    useEffect(() => {
        if (location.state?.profileUpdated) {
            setDetailsExpanded(false); 
        }
    }, [location.state]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* === Top Navigation Bar === */}
            <TopBar userProfile={user} onTogglePanel={handleProfileNavigation} />

            {/* === Welcome Banner === */}
            <WelcomeSection userProfile={user} />

            {/* === Profile Summary Section === */}
            <ProfileSummary
                userProfile={user}
                detailsExpanded={detailsExpanded}
                toggleDetails={toggleDetails}
            />

            {/* === Main Content Area === */}
            <main className="flex-1 p-4">
                <Outlet />
            </main>

            {/* === Logout Button === */}
            <div className="fixed bottom-6 right-6 z-20">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow font-medium"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
