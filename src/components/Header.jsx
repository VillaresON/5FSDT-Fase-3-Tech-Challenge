import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#700dd4",
        color: "white",
      }}
    >
      <div>Bem-vindo, {user?.nome || user?.email}</div>
      <button
        onClick={handleLogout}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#e21622",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}
