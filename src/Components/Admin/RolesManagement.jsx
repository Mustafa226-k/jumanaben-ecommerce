import { useState } from "react";
import "../../style/Admin/RolesManagement.css";

function RolesManagement() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    permissions: [],
  });

  const allPermissions = [
    "Create Product",
    "Edit Product",
    "Delete Product",
    "View Users",
    "Edit Users",
    "Delete Users",
    "View Orders",
    "Edit Orders",
    "View Reports",
    "Export Data",
    "Manage Roles",
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

  const handleAddRole = () => {
    if (formData.roleName) {
      setRoles([...roles, { ...formData, id: Date.now() }]);
      setFormData({ roleName: "", description: "", permissions: [] });
      setShowForm(false);
    }
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  return (
    <div className="roles-management">
      <div className="header-section">
        <h2>🔐 Roles Management</h2>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Role"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Create New Role</h3>
          <input
            type="text"
            name="roleName"
            placeholder="Role Name"
            value={formData.roleName}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Role Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <div className="permissions-grid">
            <h4>Select Permissions</h4>
            {allPermissions.map((permission) => (
              <label key={permission} className="permission-checkbox">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                {permission}
              </label>
            ))}
          </div>

          <button className="btn-submit" onClick={handleAddRole}>
            Create Role
          </button>
        </div>
      )}

      <div className="roles-grid">
        {roles.length > 0 ? (
          roles.map((role) => (
            <div key={role.id} className="role-card">
              <h3>{role.roleName}</h3>
              <p className="role-description">{role.description}</p>
              <div className="role-permissions">
                <strong>Permissions:</strong>
                <ul>
                  {role.permissions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="role-actions">
                <button className="btn-edit">Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}
          >
            <p>No roles created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RolesManagement;
