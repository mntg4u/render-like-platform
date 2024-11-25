import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    };
    fetchServices();
  }, []);

  const deployService = async (serviceId) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/api/services/deploy/${serviceId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Service deployed successfully!");
  };

  const stopService = async (serviceId) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/api/services/stop/${serviceId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Service stopped successfully!");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/create")}>Create Service</button>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name} - Status: {service.status}
            <button onClick={() => deployService(service._id)}>Deploy</button>
            <button onClick={() => stopService(service._id)}>Stop</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
