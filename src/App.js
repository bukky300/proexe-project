import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import { useSelector } from "react-redux";

function App() {
  const allUsers = useSelector((state) => state.users.value);

  // fetched data from api
  const getData = fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  getData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Here I got data and stored in localStorage
      if (typeof window !== "undefined") {
        const users = JSON.stringify(data);
        localStorage.setItem("users", users);
      }
      // Here windows reload to if state is null
      if (allUsers === null) {
        window.location.reload(true);
      }
    });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:userId" element={<EditUser />} />
      </Routes>
    </Layout>
  );
}

export default App;
