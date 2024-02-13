import React, { useState, useEffect } from "react";
import UpdateUser from "./UpdateUser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "./style.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("1");
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        navigate("/");

        setError("An error occurred while fetching users.");
      });
  };

  const isAdmin = localStorage.getItem("role") === "2";

  const createUser = () => {
    axios
      .post("http://localhost:3000/users", {
        first_name,
        last_name,
        email,
        password,
        role,
      })
      .then((response) => {
        const newUser = response.data;
        console.log(newUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("Buyer");
        fetchUsers();
      })
      .catch((error) => setError(error.response.data.error));
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId)); 
        fetchUsers();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCancelUpdate = () => {
    setSelectedUserId(null);
  };

  return (
    <div>
      {isAdmin ? ( 
        <>
          <h1>User List</h1>

          <ul className="user-list">
            {users.map((user) => (
              <li className="user-list-items" key={user.user_id}>
                {user.first_name}
                <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                {selectedUserId === user.user_id ? (
                  <UpdateUser
                    userId={user.user_id}
                    onUpdate={fetchUsers}
                    onCancel={handleCancelUpdate}
                  />
                ) : (
                  <button onClick={() => handleUpdateUser(user.user_id)}>
                    Update
                  </button>
                )}
              </li>
            ))}
            <h2>Create User</h2>
            <form>
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={createUser}>
                Create
              </button>
            </form>
          </ul>
        </>
      ) : (
        <div className="restricted">
          <p>Нямаш достъп до тази страница.</p>
          <p>
            Върни се в <Link to="/">Начало</Link>
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserList;
