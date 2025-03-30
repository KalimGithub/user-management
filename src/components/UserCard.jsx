import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserCard(user, setUsersData) {
  const [open, setOpen] = useState(false);
  const [firstNameEdit, setFirstNameEdit] = useState(user.user.first_name);
  const [lastNameEdit, setLastNameEdit] = useState(user.user.last_name);
  const [emailEdit, setEmailEdit] = useState(user.user.email);
  const handleClose = () => setOpen(false);

  // edit user function
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${baseUrl}/api/users/${user.user.id}`, {
      first_name: firstNameEdit,
      last_name: lastNameEdit,
      email: emailEdit,
    });
    // console.log("User updated", response.data);
    toast.success("User updated successfully");
    handleClose();
  };
  // delete user function
  const handleDelete = () => {
    // console.log("Delete user", user.user.id);
    toast.success("User deleted successfully");
  };

  return (
    <>
      <div className="flex items-center text-center gap-4 my-4 px-4 py-8 bg-gray-50 flex-col min-w-[20%] shadow-lg rounded-xl hover:scale-97 transition-all duration-300 ease-in-out">
        <img
          src={user.user.avatar}
          alt="avatar"
          className="w-22 h-22 rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">
            {user.user.first_name} {user.user.last_name}
          </h2>
          <p className="text-sm text-gray-600">{user.user.email}</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button
            className="px-6 py-1 bg-blue-800 border border-blue-800 text-white cursor-pointer rounded-md hover:bg-transparent hover:text-blue-800 hover:border-blue-800 transition-all duration-300 ease-in-out"
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-1 bg-red-800 border text-white cursor-pointer rounded-md hover:bg-transparent hover:text-red-800 hover:border-red-800 transition-all duration-300 ease-in-out"
            onClick={() => {
              confirm("Are you sure you want to delete this user?")
                ? handleDelete()
                : null;
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className="text-center"
              variant="h6"
              component="h2"
            >
              Edit User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value={firstNameEdit}
                  onChange={(e) => setFirstNameEdit(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value={lastNameEdit}
                  onChange={(e) => setLastNameEdit(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  value={emailEdit}
                  onChange={(e) => setEmailEdit(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-1 bg-blue-800 border text-white cursor-pointer rounded-md hover:bg-transparent hover:text-blue-800 hover:border-blue-800 transition-all duration-300 ease-in-out"
                  onClick={handleEditSubmit}
                >
                  Save
                </button>
                <button
                  type="submit"
                  className="px-6 py-1 bg-red-800 border text-white cursor-pointer rounded-md hover:bg-transparent hover:text-red-800 hover:border-red-800 transition-all duration-300 ease-in-out"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default UserCard;
