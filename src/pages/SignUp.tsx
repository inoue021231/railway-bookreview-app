import { useForm } from "react-hook-form";
import { postIcon, postUser } from "../api";
import { Link } from "react-router-dom";
import Compressor from "compressorjs";
import { useState } from "react";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
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

    const file = event.file[0];

    const img = new Compressor(file, {
      quality: 0.6,
      maxWidth: 1000,
      maxHeight: 400,
      success(result) {
        const compressedFile = new File([result], file.name, {
          type: result.type,
        });
        fetchData(data, compressedFile);
      },
      error(err) {
        console.error("Compression error:", err);
      },
    });
  };

  const fetchData = async (data: DataObject, file: File) => {
    const newData = await postUser(data);
    console.log(newData);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    }
    const icon = await postIcon(newData.token, file);
    console.log(icon);
    if (
      !newData.hasOwnProperty("ErrorMessageJP") &&
      icon.hasOwnProperty("ErrorMessageJP")
    ) {
      setErrorMessage(icon["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <>
      <h2>新規ユーザー登録</h2>
      <div style={{ color: "red" }}>{errorMessage !== "" && errorMessage}</div>
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
          <div className="signupForm">
            <label htmlFor="icon">ユーザーアイコン</label>
            <input
              {...register("file", {
                required: "ファイルを選択してください",
              })}
              type="file"
              id="icon"
              accept="image/jpeg, image/png"
              className="formArea"
            />
            <p className="errorText">
              {errors.file && "ファイルが選択されていません"}
            </p>
          </div>
        </div>
        <input type="submit" value="登録" />
      </form>
      <Link to="/login">ログインページへ</Link>
    </>
  );
};

export default SignUp;
