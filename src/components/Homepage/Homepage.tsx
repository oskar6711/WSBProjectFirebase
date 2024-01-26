import { useEffect, useState } from "react";
import { login, signUp } from "../../backend/firebase";
import "./homepage.css";
import { db } from "../../backend/firebase";
import { onValue, ref, remove, set, update } from "firebase/database";

type userType = {
  userId: number;
  name: string;
  surname: string;
  email: string;
};

type editUserType = {
  name?: string;
  surname?: string;
  email?: string;
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(-1);
  const [newUserData, setNewUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [editUserData, setEditUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  useEffect(() => {
    const query = ref(db, "users");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setData(Object.values(data));
      } else {
        setData([]);
      }
    });
  }, []);

  const deleteUserData = (userId: number) => {
    const query = ref(db, "users/" + userId);
    remove(query);
  };

  const writeUserData = (
    name: string,
    surname: string,
    email: string,
    id: number
  ) => {
    const query = ref(db, "users/" + id);
    set(query, {
      name: name,
      surname: surname,
      email: email,
      userId: id,
    });
  };

  const updateUserData = (
    userId: number,
    name = "",
    surname = "",
    email = ""
  ) => {
    const query = ref(db, "users/" + userId);
    const updates: editUserType = {};
    if (name) {
      updates["name"] = name;
    }
    if (surname) {
      updates["surname"] = surname;
    }
    if (email) {
      updates["email"] = email;
    }
    update(query, updates);
  };

  const submitEdit = (userId: number, name = "", surname = "", email = "") => {
    setEditing(false);
    updateUserData(userId, name, surname, email);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h1>SignUp/Login Form</h1>
        <input onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => login(email, password)}>Login</button>
        <button onClick={() => signUp(email, password)}>Signup</button>
      </div>
      <div>
        <h1>Users from DB</h1>
        <input
          onChange={(e) => {
            const userData = newUserData;
            userData["name"] = e.target.value;
            setNewUserData(userData);
          }}
          placeholder="Name"
        ></input>
        <input
          onChange={(e) => {
            const userData = newUserData;
            userData["surname"] = e.target.value;
            setNewUserData(userData);
          }}
          placeholder="Surname"
        ></input>
        <input
          onChange={(e) => {
            const userData = newUserData;
            userData["email"] = e.target.value;
            setNewUserData(userData);
          }}
          placeholder="Email"
        ></input>
        <button
          onClick={() =>
            writeUserData(
              newUserData["name"],
              newUserData["surname"],
              newUserData["email"],
              getRandomNumber()
            )
          }
        >
          Add new user
        </button>
        {data.map((user: userType) => (
          <div
            style={{
              border: "1px solid white",
              margin: "1rem",
              padding: "1rem",
            }}
            key={user.userId}
          >
            <div>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>Email: {user.email}</p>
              {editing && user.userId === userToEdit && (
                <>
                  <input
                    onChange={(e) => {
                      const userData = editUserData;
                      userData["name"] = e.target.value;
                      setEditUserData(userData);
                    }}
                    placeholder="Name"
                  ></input>
                  <input
                    onChange={(e) => {
                      const userData = editUserData;
                      userData["surname"] = e.target.value;
                      setEditUserData(userData);
                    }}
                    placeholder="Surname"
                  ></input>
                  <input
                    onChange={(e) => {
                      const userData = editUserData;
                      userData["email"] = e.target.value;
                      setEditUserData(userData);
                    }}
                    placeholder="Email"
                  ></input>
                </>
              )}
            </div>
            <div>
              {(!editing || user.userId !== userToEdit) && (
                <button
                  onClick={() => (setEditing(true), setUserToEdit(user.userId))}
                >
                  Edit
                </button>
              )}
              {editing && user.userId === userToEdit && (
                <button
                  onClick={() =>
                    submitEdit(
                      user.userId,
                      editUserData.name,
                      editUserData.surname,
                      editUserData.email
                    )
                  }
                >
                  Submit
                </button>
              )}
              <button onClick={() => deleteUserData(user.userId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
