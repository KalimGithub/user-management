import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
const baseUrl = import.meta.env.VITE_BASE_URL;

function UsersListPage() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [currentPage]);

  // get data from api
  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/users?page=${currentPage}`
      );
      setUsersData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // search functionality
  const handleSearch = async () => {
    setIsCancelVisible(true);
    try {
      const searchData = usersData.filter((user) => {
        return (
          user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setUsersData(searchData);
      setSearchValue("");
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mt-6 text-center">
        User Management Website
      </h1>
      <div className="flex items-center justify-end mr-8 mt-12 gap-4 flex-wrap">
        <button
          className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-center mt-8 gap-4 flex-wrap">
        <div className="flex justify-center items-center w-1/2 bg-gray-100 gap-4 border border-gray-500 rounded-md px-4 py-2">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search the user"
            className="focus:outline-none w-full"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button className="cursor-pointer" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-8 flex-wrap w-full min-h-[50vh]">
        {usersData.length > 0 ? (
          usersData.map((user, index) => {
            return (
              <UserCard key={index} user={user} setUsersData={setUsersData} />
            );
          })
        ) : (
          <h1 className="text-2xl font-bold text-gray-500">No Users Found!</h1>
        )}
      </div>
      {/* cancel button */}
      <button
        className={`bg-red-500 text-white px-4 py-2 cursor-pointer mx-auto rounded-md mt-8 ${
          isCancelVisible ? "block" : "hidden"
        }`}
        onClick={() => {
          setIsCancelVisible(false);
          getData();
        }}
      >
        Cancel Search
      </button>

      {/* pagination component */}
      <div className="flex items-center justify-center mt-8 py-8">
        <Pagination
          count={10}
          color="primary"
          onChange={(e, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default UsersListPage;
