import { useState } from "react";
import "../style/AdminSidebar.css";

function AdminSidebar({ activeSection, setActiveSection }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Product Management", icon: "📦" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "admins", label: "Admin Management", icon: "👔" },
    { id: "roles", label: "Roles Management", icon: "🔐" },
    { id: "reports", label: "Reports", icon: "📈" },
  ];

  const handleItemClick = (id) => {
    setActiveSection(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      <aside className={`admin-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">🚪 Logout</button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
