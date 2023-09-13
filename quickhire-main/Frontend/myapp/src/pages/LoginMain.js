import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

export default class LoginMain extends Component {
  render() {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-2xl mx-2">
            <div className="text-xl py-5 md:text-2xl">
              หากคุณกำลังมองหางาน Part time <span className="text-cyan-900">Click</span>
            </div>
            <Link to="/LoginShop" className="flex justify-center items-center">
              <div className="border-2 rounded-full text-center py-3 px-6 bg-cyan-900 text-white text-2xl md:text-5xl underline">หางานที่รู้ใจ</div>
            </Link>
          </div>

          <div className="text-2xl mx-2">
            <Link to="/LoginShop" className="flex justify-center items-center">
              <div className="border-2 rounded-full py-3 px-6 bg-yellow-500 text-white text-2xl md:text-5xl underline text-center">หาใจที่รักงาน</div>
            </Link>
            <div className="text-xl py-5 md:text-2xl">
              หากคุณกำลังมองหาเพื่อนร่วมงาน <span className="text-yellow-500">Click</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
