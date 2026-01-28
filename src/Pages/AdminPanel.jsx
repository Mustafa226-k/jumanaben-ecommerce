import { useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import ProductManagement from "../Components/Admin/ProductManagement";
import UserManagement from "../Components/Admin/UserManagement";
import AdminManagement from "../Components/Admin/AdminManagement";
import RolesManagement from "../Components/Admin/RolesManagement";
import Reports from "../Components/Admin/Reports";
import "../style/AdminPanel.css";

function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "products":
        return <ProductManagement />;
      case "users":
        return <UserManagement />;
      case "admins":
        return <AdminManagement />;
      case "roles":
        return <RolesManagement />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="admin-content">{renderSection()}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Products</h3>
          <p className="stat-number">0</p>
          <button onClick={() => (window.location.href = "#products")}>
            Manage
          </button>
        </div>
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-number">0</p>
          <button onClick={() => (window.location.href = "#users")}>
            Manage
          </button>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-number">0</p>
          <button onClick={() => (window.location.href = "#orders")}>
            View
          </button>
        </div>
        <div className="stat-card">
          <h3>Admins</h3>
          <p className="stat-number">0</p>
          <button onClick={() => (window.location.href = "#admins")}>
            Manage
          </button>
        </div>
      </div>
      <div className="dashboard-info">
        <p>Welcome to Admin Panel. Use the sidebar to manage your store.</p>
      </div>
    </div>
  );
}

export default AdminPanel;
