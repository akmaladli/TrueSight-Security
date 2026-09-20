import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

const initialDevices = [
  {
    id: 1,
    name: "Front Door Camera",
    location: "Main Entrance",
    status: "online",
  },
  { id: 2, name: "Garage Motion Sensor", location: "Garage", status: "online" },
  { id: 3, name: "Backyard Sensor", location: "Back Patio", status: "online" },
  {
    id: 4,
    name: "Window Lock System",
    location: "Living Room",
    status: "offline",
  },
];

const navItems = ["Overview", "Cameras", "Devices", "Alerts"];

const trendData = [42, 56, 50, 72, 68, 85, 94];

function DashboardPage() {
  const [devices, setDevices] = useState(initialDevices);
  const [activeNav, setActiveNav] = useState("Overview");
  const [systemArmed, setSystemArmed] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onlineCount = devices.filter(
    (device) => device.status === "online",
  ).length;
  const offlineCount = devices.length - onlineCount;
  const alertCount = offlineCount > 0 ? offlineCount : 0;
  const threatLevel =
    offlineCount === 0 ? "Low" : offlineCount === 1 ? "Medium" : "High";

  const statusSummary = useMemo(() => {
    if (!systemArmed) {
      return { title: "Standby", detail: "Security system is paused" };
    }

    return offlineCount === 0
      ? { title: "Protected", detail: "All monitored zones secure" }
      : {
          title: "Monitoring",
          detail: `${offlineCount} ${offlineCount === 1 ? "zone" : "zones"} need review`,
        };
  }, [offlineCount, systemArmed]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggleDevice = (deviceId) => {
    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              status: device.status === "online" ? "offline" : "online",
            }
          : device,
      ),
    );
  };

  const deviceStatusText = `${offlineCount} ${offlineCount === 1 ? "device" : "devices"} offline`;

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
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`nav-item ${activeNav === item ? "active" : ""}`}
                onClick={() => setActiveNav(item)}
                aria-pressed={activeNav === item}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="sidebar-card">
            <p>Threat level</p>
            <strong>{threatLevel}</strong>
            <span>{onlineCount} active zones monitored</span>
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
              <strong>{statusSummary.title}</strong>
              <small>{statusSummary.detail}</small>
            </article>
            <article className="summary-card">
              <span>Active Devices</span>
              <strong>{onlineCount} online</strong>
              <small>{deviceStatusText}</small>
            </article>
            <article className="summary-card">
              <span>Alerts</span>
              <strong>{alertCount} pending</strong>
              <small>
                {alertCount > 0 ? "Needs review" : "No active issues"}
              </small>
            </article>
          </section>

          <section className="content-grid">
            <div className="device-panel">
              <div className="panel-header">
                <h3>Connected Devices</h3>
                <button
                  type="button"
                  className={`status-pill neutral inline-toggle ${systemArmed ? "armed" : "disarmed"}`}
                  onClick={() =>
                    setSystemArmed((currentValue) => !currentValue)
                  }
                >
                  {systemArmed ? "Armed" : "Disarmed"}
                </button>
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

                    <div className="device-actions">
                      <span className={`status-pill ${device.status}`}>
                        {device.status === "online" ? "Online" : "Offline"}
                      </span>
                      <button
                        type="button"
                        className="device-toggle"
                        onClick={() => handleToggleDevice(device.id)}
                        aria-label={`Toggle ${device.name}`}
                      >
                        {device.status === "online" ? "Disable" : "Enable"}
                      </button>
                    </div>
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
                  <li className="activity-item good">
                    <span className="activity-dot" aria-hidden="true" />
                    <div>
                      <strong>Motion detected</strong>
                      <small>Garage zone 2 • 2 mins ago</small>
                    </div>
                  </li>
                  <li className="activity-item info">
                    <span className="activity-dot" aria-hidden="true" />
                    <div>
                      <strong>Door lock check</strong>
                      <small>Front entrance • 11 mins ago</small>
                    </div>
                  </li>
                  <li className="activity-item alert">
                    <span className="activity-dot" aria-hidden="true" />
                    <div>
                      <strong>Sensor maintenance</strong>
                      <small>Backyard unit • 1 hour ago</small>
                    </div>
                  </li>
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
