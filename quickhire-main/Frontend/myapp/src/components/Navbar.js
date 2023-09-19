import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../img/logo.png";

function Navbar() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("newuser");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className="Navbar flex justify-center relative sm:m-0 sm:justify-between sm:rounded-none md:rounded-xl md:m-5 items-center bg-cyan-900 flex-wrap text-lg md:text-xl lg:text-2xl">
      <div className="flex gap-5 md:gap-10 mx-10 items-center text-white">
        <Link to="/Home" className="transition duration-300 hover:scale-125">
          <img src={logo} alt="" className="w-24"></img>
        </Link>
        <div className="md:flex gap-5 md:gap-10 items-center hidden">
          <Link to="/Home" className="transition duration-300 hover:rotate-12">
            <h1>หน้าแรก</h1>
          </Link>
          <Link to="/Profile" className="transition duration-300 hover:rotate-12">
            <h1>{role === "shop" ? "หน้าร้านค้า" : "โปรไฟล์"}</h1>
          </Link>
          <Link to="/Job" className="transition duration-300 hover:rotate-12">
            <h1>{role === "shop" ? "เพิ่มประกาศ" : "ค้นหางาน"}</h1>
          </Link>
          <Link to="/Contact" className="transition duration-300 hover:rotate-12">
            <h1>ติดต่อเรา</h1>
          </Link>
        </div>
      </div>

      <div className="md:flex gap-5 md:gap-10 items-center mx-10 text-white hidden">
        {token ? (
          <button onClick={handleLogout} className="transition duration-300 hover:scale-125 border-red-500 border-4 p-2 rounded-xl">
            ออกจากระบบ
          </button>
        ) : (
          <Link to="/LoginMain" className="transition duration-300 hover:scale-125 border-orange-400 border-4 p-2 rounded-xl">
            เข้าสู่ระบบ
          </Link>
        )}
      </div>

      <div className="md:hidden mx-10 absolute right-0 top-0 translate-y-8">
        <button className="text-white" onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <div className={`w-6 h-1 bg-white my-1 ${menuOpen ? "rotate-45" : ""}`}></div>
          <div className={`w-6 h-1 bg-white ${menuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-1 bg-white my-1 ${menuOpen ? "-rotate-45" : ""}`}></div>
        </button>
      </div>

      {menuOpen && (
        <div className="flex basis-full flex-col items-center flex-wrap gap-5 text-white mb-10">
          <Link to="/Home">หน้าแรก</Link>
          <Link to="/Profile">โปรไฟล์</Link>
          <Link to="/Job">ค้นหางาน</Link>
          <Link to="/Contact">ติดต่อเรา</Link>
          {token ? (
            <button onClick={handleLogout} className="transition duration-300 hover:scale-12">
              ออกจากระบบ
            </button>
          ) : (
            <Link to="/LoginMain" className="transition duration-300 hover:scale-12 ">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
