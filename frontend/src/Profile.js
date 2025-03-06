import react,{ useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "./utils.js";
import { ToastContainer } from "react-toastify";

function Profile() {
    const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const onBack = (e) => {
    setTimeout(() => {
      navigate("/MyBlog");
    }, 1000);
  };

  const onLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
    return (
        <div className=' flex items-center justify-center bg-teal-500 min-h-screen gap-7'>
            <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-200 rounded-lg shadow-lg p-8 max-w-4xl min-h-[400px] w-full">
                {/* Left Side: Quote and Buttons */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-5xl italic font-semibold text-gray-800">
                        "Welcome {loggedInUser}"
                    </h2>
                    <div className="mt-6 flex gap-4 justify-center lg:justify-start">
                        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white active:bg-blue-700 font-medium" onClick={onLogout}>
                            LOGOUT
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white active:bg-blue-700 font-medium" onClick={onBack}>
                            BACK
                        </button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;