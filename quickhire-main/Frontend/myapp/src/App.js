import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Job from "./pages/Job";
import Createprofile from "./pages/Createprofile";
import Loginshop from "./pages/Shop/Loginshop";
import Registershop from "./pages/Shop/Registershop";
import Createshop from "./pages/Shop/Createshop";
import Profileshop from "./pages/Shop/Profileshop";
import Addjob from "./pages/Shop/Addjob";
import CardAddJob from "./pages/Shop/CardAddJob";
import { ApproveUser } from "./pages/Shop/ApproveUser";

function App() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const newuser = localStorage.getItem("newuser");
  console.log(newuser);
  console.log(role);

  if (!token) {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Login />} />
          <Route path="/Profile" element={<Createprofile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/RegisterShop" element={<Registershop />} />
          <Route path="/LoginShop" element={<Loginshop />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "new" && role === "user") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Createprofile />} />
          <Route path="/Apply" element={<Createprofile />} />
          <Route path="/Editprofile" element={<Createprofile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Createprofile />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "old" && role === "user") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Editprofile" element={<Createprofile />} />
          <Route path="/Apply" element={<Createprofile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Createprofile />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "new" && role === "shop") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Createshop />} />
          <Route path="/Create" element={<Createshop />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Job" element={<Createshop />} /> */}
          {/* <Route path="/Create" element={<Createshop />} /> */}
          <Route path="/Add" element={<Addjob />} />
          <Route path="/Approve" element={<ApproveUser />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "old" && role === "shop") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profileshop />} />
          <Route path="/Create" element={<Createshop />} />
          <Route path="/Add" element={<Addjob />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Job" element={<Addjob />} /> */}
          <Route path="/Approve" element={<ApproveUser />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App font-kanit ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        {role === "shop" ? (
          <>
            <Route path="/Add" element={<Addjob />} />
            <Route path="/Approve" element={<ApproveUser />} />
          </>
        ) : (
          <>
            {/* <Route path="/Add" element={<Addjob />} />
            <Route path="/Approve" element={<ApproveUser />} /> */}
          </>
        )}
        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route path="/Contact" element={<Contact />} />
        {/* <Route path="/Editprofile" element={<Createprofile />} /> */}
        {/* <Route path="/Job" element={<Job />} /> */}
      </Routes>
    </div>
  );
}

export default App;
