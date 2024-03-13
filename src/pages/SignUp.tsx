import { useForm } from "react-hook-form";
import { postUser, getUser } from "../api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTA0MjI5ODIsImlhdCI6MTcxMDMzNjU4Miwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiM2U5Zjg3N2ItMWFlOS00OTAyLTg0ZWEtYjAxNDY2ZGVjMDdlIn0.YTrqajUeobh6vM3GbZ4D8cbBq90lXT2bZnNuyFOPSys";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type DataObject = {
    name: String;
    email: String;
    password: String;
  };

  const onSubmit = (event: any) => {
    const data: DataObject = {
      name: event.userName,
      email: event.email,
      password: event.password,
    };
    fetchData(data);
  };

  const fetchData = async (data: DataObject) => {
    console.log(data);
    const res = await postUser(data);
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      const userData = await getUser(TOKEN);
      console.log(userData);
    })();
  }, []);

  return (
    <>
      <h2>signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signupInner">
          <div className="signupForm">
            <label htmlFor="userName">ユーザ名</label>
            <input
              {...register("userName", {
                required: true,
                minLength: 4,
              })}
              id="userName"
              className="formArea"
            />
            <p className="errorText">
              {errors.userName && "正しいユーザ名を入力してください"}
            </p>
          </div>
          <div className="signupForm">
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
          <div className="signupForm">
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
          <div className="signupForm">
            <label htmlFor="confirmPassword">パスワード確認</label>
            <input
              {...register("confirmPassword", {
                required: "パスワードを入力してください",
                minLength: 8,
                pattern: /^[a-zA-Z0-9.?/-]/,
              })}
              type="password"
              id="confirmPassword"
              className="formArea"
            />
            <p className="errorText">
              {errors.confirmPassword && "パスワードが一致しません"}
            </p>
          </div>
        </div>
        <input type="submit" />
      </form>
      <Link to="/login">ログインページ</Link>
    </>
  );
};

export default SignUp;
