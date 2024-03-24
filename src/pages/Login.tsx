import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getUser, signinUser } from "../api";
import { useEffect, useState } from "react";
import { changeLoginStatus, setToken, setUser } from "../redux/listSlice";
import { useDispatch } from "react-redux";
import Header from "../components/Header";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type DataObject = {
    email: String;
    password: String;
  };

  const onSubmit = (event: any) => {
    const data: DataObject = {
      email: event.email,
      password: event.password,
    };
    fetchData(data);
  };

  const fetchData = async (data: DataObject) => {
    const newData = await signinUser(data);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
      const res = await getUser(newData.token);
      if (res.hasOwnProperty("name")) {
        localStorage.setItem("authToken", newData.token);
        dispatch(setUser(res));
        dispatch(changeLoginStatus(true));
        dispatch(setToken(newData.token));
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    (async () => {
      if (token) {
        const res = await getUser(token);
        if (res.hasOwnProperty("name")) {
          dispatch(setUser(res));
          dispatch(changeLoginStatus(true));
          dispatch(setToken(token));
          navigate("/");
        }
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <h2>ログイン</h2>
      <div style={{ color: "red" }}>{errorMessage !== "" && errorMessage}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signupInner">
          <div className="signupForm" id="emailForm">
            <label htmlFor="email">メールアドレス</label>
            <input
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              })}
              id="email"
              className="formArea"
            />
            <p className="errorText">
              {errors.email && "正しいメールアドレスを入力してください"}
            </p>
          </div>
          <div className="signupForm" id="passwordForm">
            <label htmlFor="password">パスワード</label>
            <input
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /^[a-zA-Z0-9.?/-]/,
              })}
              type="password"
              id="password"
              className="formArea"
            />
            <p className="errorText">
              {errors.password && "正しいパスワードを入力してください"}
            </p>
          </div>
        </div>
        <input className="submit" type="submit" value="ログイン" />
      </form>
    </div>
  );
};

export default Login;
