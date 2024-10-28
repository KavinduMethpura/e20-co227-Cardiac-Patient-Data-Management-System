import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../AdminComponents/SideBar";
import TopBar from "../AdminComponents/TopBar";
import useStateContext from "../../contexts/useStateContext";

const AdminMainLayout = () => {
  const { token, setUser, user, setToken } = useStateContext();

  // Safely check if the user is authenticated and has the "ADMIN" role
  if (!token || !user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    console.log("User logged out");
    setUser(null);
    setToken(null);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar will remain fixed to the left */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <Sidebar />
      </div>

      {/* Main content area, with margin to make space for the sidebar */}
      <div className="flex-1 flex flex-col ml-64">
        {/* TopBar will be fixed at the top */}
        <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-lg z-10">
          <TopBar patientName={"HI"} handleLogout={handleLogout} />
        </div>

        {/* Main content section */}
        <div className="flex-1 mt-16 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMainLayout;