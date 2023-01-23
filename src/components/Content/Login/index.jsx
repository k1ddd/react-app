import React, { useState, useEffect } from "react";
import { login, register } from "../../../features/login/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginStatus } from "../../../features/login/loginSlice";
import Swal from "sweetalert2";
import "./styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { status } = useSelector((state) => state.auth);
  const { userLogin } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(login({ email: email, password: pass }));
    setData({ email: email, password: pass });
  };

  useEffect(() => {
    if (status === "error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: userLogin,
      });
      dispatch(resetLoginStatus());
    } else if (status === "succeeded") {
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: `You are logged in`,
      });
      dispatch(resetLoginStatus());
    }
  }, [data, login, status, dispatch]);

  return (
    <div>
      {token ? (
        <div>You are logged in</div>
      ) : (
        <div className="blockForm">
          <form action="">
            <div className="login">
              Login
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pass">
              Password
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </form>
          <br />
        </div>
      )}
    </div>
  );
};

export default Login;
