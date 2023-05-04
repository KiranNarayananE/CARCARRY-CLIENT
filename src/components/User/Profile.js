import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import AxiosInstance from "../../api/axios";
import { Toast } from "./Toast";
const Profile = () => {
  const [error, setError] = useState("");
  const token = useSelector((state) => state.userLogin.token);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
 

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      user.name === "" ||
      user.userName === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.address === "" ||
      user.city === "" ||
      user.state === "" ||
      user.zipcode === "" 
      
    ) {
      setError("All fields are required.");
      return false;
    }

    if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
    ) {
      setError("Invalid email address.");
      return false;
    }
    console.log(user.phone)

    if (!/^\d{10}$/.test(user.phone)) {
      setError("Invalid phone number. Phone number must be 10 digits long.");
      return false;
    }

 


 else{

 const update = async (Data) => {
  try {
    const response = await AxiosInstance.put(`/profile`, user, {
      headers: { Authorization: `Bearer ${token}` } ,
    });
    const data = response.data.user;
    if (data) return data;
  } catch (error) {
    return error.response.data.error;
  }
};

    const response = await update(user);
    setUser(response)
}
  };
  

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchUserDetails = async (token) => {
    try {
      const response = await axiosInstance.get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  
   const updateUserProfile = async (image, token) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
  
      const response = await axiosInstance.post("/profile", formData, {
        headers: { Authorization: "Bearer " + token, "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const fetchDetails = async () => {
    const response = await fetchUserDetails(token);

    if (response.status === 201) {
      setUser(response.data.user);
    }

    if (response.status === 200) {
      setUser(response.data.user);
      Toast.fire({
        icon: "success",
        title: "Profile updated successfully",
      })
    }

    if (response.status === 500) return navigate("/error");
  };

  const uploadImage = async (event) => {
    const image = event.target.files[0];
    const response = await updateUserProfile(image, token);
    if (response.status === 200) return setUser({ ...user,profile: response.data.userProfile });
    if (response.status === 500) return navigate("/error");
  };

  return (
  <><div class="flex items-center justify-between">
      <div class=" font-sans mt-36 w-8/12 flex justify-start items-start text-black">
        <div class=" w-full ">
        {/* <form > */}
          <label htmlFor="profile-picture">
            {console.log(user)}
            <div class="relative">
              {user?.profile? (
                <img className="w-32 h-32 mx-auto rounded-full  brightness-50 -mt-20" src={`/images/${user?.profile}`} alt="" />
              ) : (
                <img className="w-32 mx-auto rounded-full  brightness-50 -mt-20" src="https://dummyimage.com/80x80" alt="" />
              )}
              <div class="absolute inset-0 flex items-end justify-center text-white mb-2">
                <DriveFileRenameOutlineIcon />
              </div>
            </div>
            
          </label>
          <input type="file" id="profile-picture" name="profile-picture" className="hidden" onChange={uploadImage} />
          {/* </form> */}
          <div>
            <div class="text-center mt-2 text-3xl font-medium">{user?.name}</div>
            <div class="text-center mt-4 font-light text-sm">{user?.email}</div>
            <div class="text-center mt-1 font-normal text-lg">+91{user?.phone}</div>

            <hr class="mt-8" />
           
          </div>
        </div>
      </div>
      <div className="leading-10">
      <h1 className="text-2xl text-black font-semibold"> Get a ride in minutes</h1>
      <p className="text-black">Plan a trip,But book a taxi as before your plan a trip.</p>
      <Link to="/" className="btn">
        Request a Booking
      </Link>
    </div>
    </div>
  

      <section className="w-full h-full p-6 ml-5 bg-white-800 text-gray-50">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="container flex flex-col  space-y-12  md:w-3/5">
        {error ? (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        ) : (
          ""
        )}

        <fieldset className="grid gap-6 p-6 rounded-md shadow-sm bg-gray-900">
          
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Name?</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user?.name}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">User Name</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  value={user?.userName}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Phone</span>
                </label>
                <input
                  type="tel"
                  placeholder="Type here"
                  name="phone"
                  value={user?.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-white">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="address"
                  value={user?.address}
                  onChange={handleInputChange}
                  className="input input-bordered w-full text-black "
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">City</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="city"
                  value={user?.city}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white"> State / Province</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="state"
                  value={user?.state}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white"> ZIP / Postal</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  name="zipcode"
                  value={user?.zipcode}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
            </div>
            <div className="md:mt-5 px-auto">
            <button
              className="btn btn-active px-20 md:px-auto  place-items-center "
              onClick={()=>handleSubmit()}>
              Submit
            </button>
          </div>
          </div>
        </fieldset>
        
      </form>
    </section>
    </>
  );
};

export default Profile;
