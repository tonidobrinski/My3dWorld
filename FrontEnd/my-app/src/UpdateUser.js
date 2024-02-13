import React, { useState } from "react";
import axios from "axios";

const UpdateUser = ({ userId, onUpdate, onCancel }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");
  const [error, setError] = useState(null);

  const updateUser = () => {
    axios
      .put(`http://localhost:3000/users/${userId}`, {
        first_name,
        last_name,
        email,
        role_id: 1,
      })
      .then(() => {
        onUpdate(); 
        setFirstName("");
        setEmail("");
        setRole("Buyer");
      })
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <div className="update-user">
      <h2>Update User</h2>
      <form>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={updateUser}>
          Update
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateUser;
