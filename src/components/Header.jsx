import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1>User Management</h1>
      <div className="space-x-4">
        <a href="/login">Login</a>
        <a href="/users">Users</a>
      </div>
    </div>
  );
}

export default Header;
