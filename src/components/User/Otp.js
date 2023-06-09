import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { setLogin } from "../../Store/Slice/Login";
import { useDispatch } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../api/firebase";

const Otp = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "" });
  const [OTPtoast, setOTPtoast] = useState({ message: "" });
  const [isPhone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);


  useEffect(() => {
    setPhone(location.state.Phone);
    setEmail(location.state.email);
    onSignup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleKeyUp = (e) => {
    
      switch (e.target.name) {
        case "input1":
          if(!e.target.value){
            input1Ref.current.focus();
          }
          else{
            input2Ref.current.focus();
          }
          
          break;
        case "input2":
          if(!e.target.value){
            input1Ref.current.focus(); 
          }
          else{
          input3Ref.current.focus();}
          break;
        case "input3":
          if(!e.target.value){
            input2Ref.current.focus();
          }
          else{
            input4Ref.current.focus();
          }
          
          break;
        case "input4":
          if(!e.target.value){
            input3Ref.current.focus();
          }
          else{
            input5Ref.current.focus();
          }
          
          break;
        case "input5":
          if(!e.target.value){
            input4Ref.current.focus();
          }
          else{
            input6Ref.current.focus();
          }
          
          break;
        
        default:
          break;
      }
    
  }; 

  const handlePassword = () => {
    navigate("/password", { state: { email: email } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onOTPVerify()
      }
      function onCaptchVerify(){
        console.log("saved1")
        if (!window.recaptchaVerifier) {
          console.log("saved2")
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                console.log("saved3")
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        
      }
      }
      function onSignup() {
        onCaptchVerify();
        console.log("saved4")
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+91"+location.state.Phone;
        console.log(formatPh)
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            console.log("send")
            window.confirmationResult = confirmationResult;
          
          })
          .catch((error) => {
            console.log(error);
            
          });
      }
      
      function onOTPVerify() {
        let otp =inputs.input1+inputs.input2+inputs.input3+inputs.input4+inputs.input5+inputs.input6
        
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            const response = await axiosInstance.post("/loginsuccess", {
              phone: isPhone,
            });
            const isLoggedIn = response.data;
      console.log(isLoggedIn);
      if (isLoggedIn) {
        dispatch(
          setLogin({
            user: "user",
            name: isLoggedIn.name,
            token: isLoggedIn.token,
          })
        );
        navigate("/");
      }
          })
          .catch((err) => {
            setToast({ message: "OTP Invalid" }); 

          });
      }


  const handleResend = async () => {
    onSignup()
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className={`${!OTPtoast.message ? "hidden" : "shown"}`}>
            <div className="alert alert-info">
              <div>
                <span>{OTPtoast.message}.</span>
              </div>
            </div>
          </div>
          <div
            className={`alert alert-error shadow-lg ${
              !toast.message ? "hidden " : "shown"
            }`}>
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
              <span>{toast.message}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-black">
              <p>Phone Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your number {isPhone}</p>
            </div>
          </div>
        <div id="recaptcha-container"></div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input1"
                      maxLength={1}
                      ref={input1Ref}
                      value={inputs.input1}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                      id=""
                    />
                  </div>
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input2"
                      maxLength={1}
                      ref={input2Ref}
                      value={inputs.input2}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input3"
                      maxLength={1}
                      ref={input3Ref}
                      value={inputs.input3}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input4"
                      maxLength={1}
                      ref={input4Ref}
                      value={inputs.input4}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input5"
                      maxLength={1}
                      ref={input5Ref}
                      value={inputs.input5}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                  <div className="w-12 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="input6"
                      maxLength={1}
                      ref={input6Ref}
                      value={inputs.input6}
                      onChange={handleChange}
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 mt-10 text-gray-500">
              <p>Didn't recieve code?</p>
              <button
                className="flex flex-row items-center text-blue-600"
                onClick={handleResend}>
                Resend
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center  mt-5 ">
        <button className="btn btn-ghost" onClick={handlePassword}>
          Login with Password
        </button>
      </div>
    </div>

  );
};

export default Otp;
