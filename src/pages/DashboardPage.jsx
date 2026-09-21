import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const initialDevices = [
  {
    id: 1,
    name: "Front Door Camera",
    location: "Main Entrance",
    status: "online",
    previewImage: "/frontdoor.jpg",
  },
  {
    id: 2,
    name: "Garage Camera",
    location: "Garage",
    status: "online",
    previewImage: "/garage.jpg",
  },
  {
    id: 3,
    name: "Backyard Camera",
    location: "Back Patio",
    status: "online",
    previewImage: "/backyard.jpg",
    toggleLabel: "Backyard Sensor",
  },
  {
    id: 4,
    name: "Window Lock System",
    location: "Living Room",
    status: "offline",
  },
  {
    id: 5,
    name: "Basement Motion Sensor",
    location: "Basement",
    status: "online",
  },
  {
    id: 6,
    name: "Living Room Camera",
    location: "Living Room",
    status: "online",
    previewImage: "/livingroom.jpg",
  },
  {
    id: 7,
    name: "Driveway Sensor",
    location: "Driveway",
    status: "online",
  },
  {
    id: 8,
    name: "Patio Beam Sensor",
    location: "Patio",
    status: "online",
  },
];

const navItems = ["Overview", "Cameras", "Sensors & Lock System", "Alerts"];

function DashboardPage() {
  const [devices, setDevices] = useState(initialDevices);
  const [activeNav, setActiveNav] = useState("Overview");
  const [systemArmed, setSystemArmed] = useState(true);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const visibleDevices = useMemo(() => {
    if (activeNav === "Cameras") {
      return devices.filter((device) => device.previewImage);
    }

    if (activeNav === "Alerts") {
      return devices.filter((device) => device.status === "offline");
    }

    if (activeNav === "Sensors & Lock System") {
      return devices.filter(
        (device) =>
          !device.previewImage ||
          device.name.includes("Lock") ||
          device.name.includes("Sensor"),
      );
    }

    return devices;
  }, [activeNav, devices]);

  const onlineCount = devices.filter(
    (device) => device.status === "online",
  ).length;
  const offlineCount = devices.length - onlineCount;
  const alertCount = offlineCount > 0 ? offlineCount : 0;
  const effectiveThreatLevel = !systemArmed
    ? "High"
    : offlineCount === 0
      ? "Low"
      : offlineCount === 1
        ? "Medium"
        : "High";
  const threatLevel = effectiveThreatLevel;
  const threatLevelClass =
    threatLevel === "Low"
      ? "low"
      : threatLevel === "Medium"
        ? "medium"
        : "high";

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
    setIsLoggedIn(false);
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

          <nav className="top-nav" aria-label="Primary navigation">
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

          <section className="content-grid">
            <div className="device-panel">
              <div className="panel-header">
                <h3>
                  {activeNav === "Overview" ? "Connected Devices" : activeNav}
                </h3>
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
                {visibleDevices.map((device) => (
                  <article
                    key={device.id}
                    className={`device-item ${device.previewImage ? "has-preview" : ""}`}
                  >
                    <div className="device-main">
                      {device.previewImage ? (
                        <div className="device-preview-wrap">
                          <img
                            src={device.previewImage}
                            alt={`${device.name} live view`}
                            className="device-preview"
                          />
                          {device.status === "online" ? (
                            <span className="live-badge">Live</span>
                          ) : null}
                        </div>
                      ) : (
                        <div className="device-icon" aria-hidden="true">
                          {device.status === "online" ? "●" : "○"}
                        </div>
                      )}

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
                        aria-label={`Toggle ${device.toggleLabel || device.name}`}
                      >
                        {device.status === "online" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel-stack">
              <div
                className={`panel-card threat-card threat-${threatLevelClass}`}
              >
                <div className="panel-header compact">
                  <h3 className="threat-title">
                    <span className="threat-glow-dot" aria-hidden="true" />
                    Threat level
                  </h3>
                  <span className="mini-tag">Live</span>
                </div>
                <strong className="threat-card-value">{threatLevel}</strong>
                <small>{onlineCount} active zones monitored</small>
              </div>

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
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
