import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const devices = [
  {
    id: 1,
    name: "Front Door Camera",
    location: "Main Entrance",
    status: "online",
  },
  { id: 2, name: "Garage Motion Sensor", location: "Garage", status: "online" },
  { id: 3, name: "Backyard Sensor", location: "Back Patio", status: "offline" },
  {
    id: 4,
    name: "Window Lock System",
    location: "Living Room",
    status: "online",
  },
];

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="topbar">
          <div className="brand-wrap brand-wrap-dashboard">
            <div className="brand-badge">TS</div>
            <div>
              <p className="eyebrow">Security Overview</p>
              <h2>TrueSight Security</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <span className="user-pill">Admin</span>
            <button
              type="button"
              className="secondary-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="summary-grid">
          <article className="summary-card accent">
            <span>System Status</span>
            <strong>Protected</strong>
            <small>All monitored zones secure</small>
          </article>
          <article className="summary-card">
            <span>Active Devices</span>
            <strong>3 online</strong>
            <small>1 device offline</small>
          </article>
          <article className="summary-card">
            <span>Alerts</span>
            <strong>1 pending</strong>
            <small>Needs review</small>
          </article>
        </section>

        <section className="device-panel">
          <div className="panel-header">
            <h3>Connected Devices</h3>
            <span className="status-pill neutral">Live</span>
          </div>

          <div className="device-list">
            {devices.map((device) => (
              <article key={device.id} className="device-item">
                <div className="device-main">
                  <div className="device-icon" aria-hidden="true">
                    {device.status === "online" ? "●" : "○"}
                  </div>

                  <div className="device-copy">
                    <h4>{device.name}</h4>
                    <p>{device.location}</p>
                  </div>
                </div>

                <span className={`status-pill ${device.status}`}>
                  {device.status === "online" ? "Online" : "Offline"}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
