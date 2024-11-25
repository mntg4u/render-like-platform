import React, { useState } from "react";
import axios from "axios";

const ServiceCreate = () => {
  const [name, setName] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [startCommand, setStartCommand] = useState("");
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);

  const handleEnvChange = (index, key, value) => {
    const updatedVars = [...envVars];
    updatedVars[index][key] = value;
    setEnvVars(updatedVars);
  };

  const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/services/create",
      { name, buildCommand, startCommand, envVariables: envVars },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Build Command"
        value={buildCommand}
        onChange={(e) => setBuildCommand(e.target.value)}
      />
      <input
        type="text"
        placeholder="Start Command"
        value={startCommand}
        onChange={(e) => setStartCommand(e.target.value)}
      />
      {envVars.map((env, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Key"
            value={env.key}
            onChange={(e) => handleEnvChange(index, "key", e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={env.value}
            onChange={(e) => handleEnvChange(index, "value", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addEnvVar}>
        Add Env Var
      </button>
      <button type="submit">Create Service</button>
    </form>
  );
};

export default ServiceCreate;
