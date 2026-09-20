import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

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

const activityItems = [
  {
    label: "Motion detected",
    detail: "Garage zone 2 • 2 mins ago",
    tone: "good",
  },
  {
    label: "Door lock check",
    detail: "Front entrance • 11 mins ago",
    tone: "info",
  },
  {
    label: "Sensor maintenance",
    detail: "Backyard unit • 1 hour ago",
    tone: "alert",
  },
];

const trendData = [42, 56, 50, 72, 68, 85, 94];

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
        <aside className="sidebar">
          <div className="sidebar-brand">
            <img
              src={logo}
              alt="TrueSight Security logo"
              className="sidebar-brand-logo"
            />
            <div>
              <strong>TrueSight</strong>
              <span>Security</span>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Sidebar navigation">
            <button type="button" className="nav-item active">
              Overview
            </button>
            <button type="button" className="nav-item">
              Cameras
            </button>
            <button type="button" className="nav-item">
              Devices
            </button>
            <button type="button" className="nav-item">
              Alerts
            </button>
          </nav>

          <div className="sidebar-card">
            <p>Threat level</p>
            <strong>Low</strong>
            <span>3 active zones monitored</span>
          </div>
        </aside>

        <section className="main-panel">
          <header className="topbar">
            <div>
              <p className="topbar-kicker">Protection overview</p>
              <h1>Security dashboard</h1>
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

          <section className="content-grid">
            <div className="device-panel">
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
            </div>

            <div className="panel-stack">
              <div className="panel-card activity-panel">
                <div className="panel-header compact">
                  <h3>Recent activity</h3>
                  <span className="mini-tag">Today</span>
                </div>

                <ul className="activity-list">
                  {activityItems.map((item) => (
                    <li
                      key={item.label}
                      className={`activity-item ${item.tone}`}
                    >
                      <span className="activity-dot" aria-hidden="true" />
                      <div>
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-card chart-panel">
                <div className="panel-header compact">
                  <h3>Protection trend</h3>
                  <span className="mini-tag success">+12%</span>
                </div>

                <div className="chart-bars" aria-label="Protection trend chart">
                  {trendData.map((value, index) => (
                    <span
                      key={`${value}-${index}`}
                      className="chart-bar"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
