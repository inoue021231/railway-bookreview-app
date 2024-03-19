import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { putUsers } from "../api";
import { setUser } from "../redux/listSlice";

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.list.user);
  const token = useSelector((state: RootState) => state.list.token);
  const loginStatus = useSelector((state: RootState) => state.list.loginStatus);

  const onSubmit = (event: any) => {
    const data = {
      name: event.userName,
    };
    fetchData(data);
  };

  const fetchData = async (data: any) => {
    const newData = await putUsers(token, data);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
      dispatch(setUser({ name: newData.name, icon: user.icon }));
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <h2>登録情報編集</h2>
      <div style={{ color: "red" }}>{errorMessage !== "" && errorMessage}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signupInner">
          <div className="signupForm">
            <label htmlFor="userName">新規ユーザ名</label>
            <input
              {...register("userName", {
                required: true,
                minLength: 4,
              })}
              value={user.name}
              id="userName"
              className="formArea"
            />
            <p className="errorText">
              {errors.userName && "正しいユーザ名を入力してください"}
            </p>
          </div>
        </div>
        <input className="submit" type="submit" value="更新" />
      </form>
    </div>
  );
};

export default Profile;
