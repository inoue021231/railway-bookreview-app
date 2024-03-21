import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getBook } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./detailreview.scss";

const DetailReview = () => {
  type ReviewProps = {
    title?: string;
    url?: string;
    detail?: string;
    review?: string;
    reviewer?: string;
    isMine?: boolean;
  };

  const [isError, setIsError] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewProps>({});
  const urlParams = useParams<{ id: string }>();

  const token: string = useSelector((state: RootState) => state.list.token);
  const id: string = urlParams.id ?? "";

  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    (async () => {
      const data = await getBook(token, id);
      if (data.hasOwnProperty("ErrorMessageJP")) {
        setIsError(true);
      } else {
        setIsError(false);
        setReviewData(data);
      }
    })();
  }, []);

  console.log(reviewData);
  console.log(isError);

  return (
    <div>
      <Header />
      <Link to="/">一覧画面に戻る</Link>
      {!isError ? (
        <div className="review">
          <div className="review__title">{reviewData.title}</div>
          <div className="review__url">{reviewData.url}</div>
          <div className="review__detail">{reviewData.detail}</div>
          <br />
          <div className="review__reivew">{reviewData.review}</div>
          <div className="review__reviewer">{reviewData.reviewer}</div>
        </div>
      ) : (
        <div>エラーが発生しました。</div>
      )}
    </div>
  );
};

export default DetailReview;
