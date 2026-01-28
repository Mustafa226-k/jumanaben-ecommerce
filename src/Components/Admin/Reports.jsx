import "../../style/Admin/Reports.css";

function Reports() {
  return (
    <div className="reports-section">
      <div className="header-section">
        <h2>📈 Reports & Analytics</h2>
        <button className="btn-export">📥 Export Data</button>
      </div>

      <div className="reports-intro">
        <div className="info-card">
          <h3>📊 Data Available for Graph Integration</h3>
          <p>
            You can integrate your preferred graphing library (Chart.js,
            Recharts, Apache ECharts, D3.js, etc.) to visualize the following
            data:
          </p>
          <ul>
            <li>
              <strong>Sales Analytics:</strong> Daily, Weekly, Monthly revenue
              trends
            </li>
            <li>
              <strong>Product Performance:</strong> Top selling products,
              inventory levels
            </li>
            <li>
              <strong>User Analytics:</strong> New users, active users, user
              retention
            </li>
            <li>
              <strong>Order Analytics:</strong> Order status breakdown,
              fulfillment rates
            </li>
            <li>
              <strong>Admin Activity:</strong> Recent admin actions and changes
            </li>
            <li>
              <strong>Customer Insights:</strong> Average order value, repeat
              customers
            </li>
          </ul>
        </div>
      </div>

      <div className="data-sections">
        <div className="data-card">
          <h3>📦 Product Data</h3>
          <div className="data-placeholder">
            <p>Graph placeholder for product analytics</p>
            <p className="hint">Add your chart component here</p>
          </div>
        </div>

        <div className="data-card">
          <h3>👥 User Data</h3>
          <div className="data-placeholder">
            <p>Graph placeholder for user analytics</p>
            <p className="hint">Add your chart component here</p>
          </div>
        </div>

        <div className="data-card">
          <h3>📊 Order Data</h3>
          <div className="data-placeholder">
            <p>Graph placeholder for order analytics</p>
            <p className="hint">Add your chart component here</p>
          </div>
        </div>

        <div className="data-card">
          <h3>💰 Revenue Data</h3>
          <div className="data-placeholder">
            <p>Graph placeholder for revenue analytics</p>
            <p className="hint">Add your chart component here</p>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <h3>Quick Statistics</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <h4>Total Products</h4>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-box">
            <h4>Total Users</h4>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-box">
            <h4>Total Orders</h4>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-box">
            <h4>Total Revenue</h4>
            <p className="stat-value">$0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
