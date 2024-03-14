import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signinUser } from "../api";

const Login = () => {
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
    const token = await signinUser(data);
    console.log(token);
  };

  return (
    <>
      <h2>ログイン</h2>
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
        <input className="submit" type="submit" />
      </form>
      <Link to="/signup">新規ユーザー登録ページへ</Link>
    </>
  );
};

export default Login;
