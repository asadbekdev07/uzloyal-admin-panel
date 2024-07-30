import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLoggedIn }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token?.length > 27) {
      setIsLoggedIn(true);
      navigate("/categories");
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token, navigate, setIsLoggedIn]);

  const loginToSite = (e) => {
    e.preventDefault();

    fetch("https://api.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phone_number: phone,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === true) {
          localStorage.setItem("accessToken", data?.data?.tokens?.accessToken?.token);
          toast.success(data?.message);
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="container-custom flex items-center justify-center h-screen">
      <div className="w-[400px] p-8 custom-box-shadow border border-gray-200 bg-[#fafafa] rounded-lg">
        <form onSubmit={loginToSite}>
          <div className="mb-8">
            <input
              className="w-[100%] p-2 focus:outline-none"
              type="text"
              placeholder="Phone"
              required
              minLength={3}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              style={{
                borderColor: phoneFocused ? "#6EE7B7" : "#CBD5E0",
                borderWidth: "1px",
              }}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              className="w-[100%] p-2 focus:outline-none"
              type="password"
              placeholder="Password"
              required
              minLength={5}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                borderColor: passwordFocused ? "#6EE7B7" : "#CBD5E0",
                borderWidth: "1px",
              }}
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </div>

          <button className="bg-cyan-600 w-[100%] p-3 rounded-md text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
