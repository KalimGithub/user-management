import { createContext, useContext } from "react";

const UsersDataContext = createContext(null);

export const useUsersData = () => {
  return useContext(UsersDataContext);
};

export const UsersProvider = (props) => {
  const [usersData, setUsersData] = useState(null);
  const fetchData = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .get(`${baseUrl}/api/users?page=${currentPage}`)
      .then((response) => {
        setUsersData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };
  return (
    <UsersDataContext.Provider value={{ usersData, fetchData }}>
      {props.children}
    </UsersDataContext.Provider>
  );
};
