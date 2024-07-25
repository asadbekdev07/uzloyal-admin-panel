import React, { useState } from "react";

const Login = () => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="container-custom flex items-center justify-center h-screen">
      <div className="w-[400px] p-8 custom-box-shadow border border-gray-200 bg-[#fafafa] rounded-lg">
        <form>
          <div className="mb-8">
            <input
              className="w-[100%] p-2 focus:outline-none"
              type="text"
              placeholder="Phone"
              required
              min={3}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              style={{ borderColor: phoneFocused ? '#6EE7B7' : '#CBD5E0', borderWidth: '1px' }}
            />
          </div>
          <div className="mb-8">
            <input
              className="w-[100%] p-2 focus:outline-none"
              type="password"
              placeholder="Password"
              required
              min={5}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{ borderColor: passwordFocused ? '#6EE7B7' : '#CBD5E0', borderWidth: '1px' }}
            />
          </div>

          <button className="bg-cyan-600 w-[100%] p-3 rounded-md text-white">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
