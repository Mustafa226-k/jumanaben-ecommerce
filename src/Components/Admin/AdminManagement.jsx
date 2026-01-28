import { useState } from "react";
import "../../style/Admin/AdminManagement.css";

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "moderator",
    permissions: [],
  });

  const permissionOptions = [
    "Manage Products",
    "Manage Users",
    "Manage Orders",
    "View Reports",
    "Manage Admins",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (permission) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.includes(permission)
        ? formData.permissions.filter((p) => p !== permission)
        : [...formData.permissions, permission],
    });
  };

  const handleAddAdmin = () => {
    if (formData.name && formData.email) {
      setAdmins([...admins, { ...formData, id: Date.now() }]);
      setFormData({ name: "", email: "", role: "moderator", permissions: [] });
      setShowForm(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div className="admin-management">
      <div className="header-section">
        <h2>👔 Admin Management</h2>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Admin"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Add New Admin</h3>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="moderator">Moderator</option>
            <option value="supervisor">Supervisor</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <div className="permissions-section">
            <h4>Permissions</h4>
            {permissionOptions.map((permission) => (
              <label key={permission}>
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                {permission}
              </label>
            ))}
          </div>

          <button className="btn-submit" onClick={handleAddAdmin}>
            Add Admin
          </button>
        </div>
      )}

      <div className="admins-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span className="role-badge">{admin.role}</span>
                  </td>
                  <td>
                    <div className="permissions-list">
                      {admin.permissions.map((p) => (
                        <span key={p} className="permission-tag">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No admins yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManagement;
