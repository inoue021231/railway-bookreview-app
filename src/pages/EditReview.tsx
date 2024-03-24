import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postBooks, putBook } from "../api";

const EditReview = () => {
  type ReviewProps = {
    title?: string;
    url?: string;
    detail?: string;
    review?: string;
    reviewer?: string;
    isMine?: boolean;
  };

  /* const [reviewData, setReviewData] = useState<ReviewProps>({}); */
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const urlParams = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.list.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewData, setReviewData] = useState<ReviewProps>(
    location.state.reviewData
  );
  const id: string = urlParams.id ?? "";

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
    const newData = await putBook(token, id, data);
    if (newData.hasOwnProperty("ErrorMessageJP")) {
      setErrorMessage(newData["ErrorMessageJP"]);
    } else {
      setErrorMessage("");
      navigate("/");
    }
  };

  /* useEffect(() => {
    setReviewData(location.state.reviewData);
  }, []); */

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
              value={reviewData.title}
              onChange={(event) =>
                setReviewData({ ...reviewData, title: event.target.value })
              }
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
              value={reviewData.url}
              onChange={(event) =>
                setReviewData({ ...reviewData, url: event.target.value })
              }
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
              value={reviewData.detail}
              onChange={(event) =>
                setReviewData({ ...reviewData, detail: event.target.value })
              }
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
              value={reviewData.review}
              onChange={(event) =>
                setReviewData({ ...reviewData, review: event.target.value })
              }
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

export default EditReview;
