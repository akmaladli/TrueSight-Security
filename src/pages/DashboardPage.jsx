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
      <header className="topbar">
        <div>
          <p className="eyebrow">Security Overview</p>
          <h2>TrueSight Security</h2>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <section className="summary-grid">
        <div className="summary-card accent">
          <span>System Status</span>
          <strong>Protected</strong>
        </div>
        <div className="summary-card">
          <span>Active Devices</span>
          <strong>3 online</strong>
        </div>
        <div className="summary-card">
          <span>Alerts</span>
          <strong>1 pending</strong>
        </div>
      </section>

      <section className="device-panel">
        <div className="panel-header">
          <h3>Connected Devices</h3>
          <span className="status-pill neutral">Live</span>
        </div>

        <div className="device-list">
          {devices.map((device) => (
            <article key={device.id} className="device-item">
              <div className="device-copy">
                <h4>{device.name}</h4>
                <p>{device.location}</p>
              </div>

              <span className={`status-pill ${device.status}`}>
                {device.status === "online" ? "Online" : "Offline"}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
