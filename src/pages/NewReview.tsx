import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postBooks } from "../api";

const NewReview = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = useSelector((state: RootState) => state.list.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type ReviewProps = {
    title: string;
    url: string;
    detail: string;
    review: string;
  };

  const onSubmit = (event: any) => {
    const data: ReviewProps = {
      title: event.title,
      url: event.url,
      detail: event.detail,
      review: event.review,
    };
    fetchData(data);
  };

  const fetchData = async (data: ReviewProps) => {
    const newData = await postBooks(token, data);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
      navigate("/");
    }
    /* const newData = await signinUser(data);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
      console.log(newData);
      const res = await getUser(newData.token);
      if (res.hasOwnProperty("name")) {
        localStorage.setItem("authToken", newData.token);
        dispatch(setUser(res));
        dispatch(changeLoginStatus(true));
        dispatch(setToken(newData.token));
        navigate("/");
      }
    }
    console.log(newData); */
  };

  return (
    <div>
      <Header />
      <Link to="/">一覧画面に戻る</Link>
      <div style={{ color: "red" }}>{errorMessage !== "" && errorMessage}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signupInner">
          <div className="signupForm" id="titleForm">
            <label htmlFor="title">タイトル</label>
            <input
              {...register("title", {
                required: true,
              })}
              id="title"
              className="formArea"
            />
            <p className="errorText">
              {errors.title && "タイトルを入力してください"}
            </p>
          </div>

          <div className="signupForm" id="urlForm">
            <label htmlFor="url">URL</label>
            <input
              {...register("url", {
                required: true,
              })}
              id="url"
              className="formArea"
            />
            <p className="errorText">{errors.url && "URLを入力してください"}</p>
          </div>

          <div className="signupForm" id="detailForm">
            <label htmlFor="detail">詳細</label>
            <input
              {...register("detail", {
                required: true,
              })}
              id="detail"
              className="formArea"
            />
            <p className="errorText">
              {errors.detail && "詳細を入力してください"}
            </p>
          </div>

          <div className="signupForm" id="reviewForm">
            <label htmlFor="review">レビュー</label>
            <input
              {...register("review", {
                required: true,
              })}
              id="review"
              className="formArea"
            />
            <p className="errorText">
              {errors.review && "レビュー文を入力してください"}
            </p>
          </div>
        </div>
        <input className="submit" type="submit" value="登録" />
      </form>
    </div>
  );
};

export default NewReview;
