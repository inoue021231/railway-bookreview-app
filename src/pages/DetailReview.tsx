import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { deleteBook, getBook } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./detailreview.scss";
import Loading from "../components/Loading";
import { changeIsLoading } from "../redux/listSlice";

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

  const dispatch = useDispatch();
  const token: string = useSelector((state: RootState) => state.list.token);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.list.isLoading
  );
  const id: string = urlParams.id ?? "";

  useEffect(() => {
    (async () => {
      dispatch(changeIsLoading(true));
      const data = await getBook(token, id);
      if (data.hasOwnProperty("ErrorMessageJP")) {
        setIsError(true);
      } else {
        setIsError(false);
        setReviewData(data);
      }
      dispatch(changeIsLoading(false));
    })();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/">一覧画面に戻る</Link>
      {isError ? (
        <h3>エラーが発生しました。</h3>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="review">
          <div className="review__title">{reviewData.title}</div>
          <div className="review__url">{reviewData.url}</div>
          <div className="review__detail">{reviewData.detail}</div>
          <br />
          <div className="review__reivew">{reviewData.review}</div>
          <div className="review__reviewer">{reviewData.reviewer}</div>
        </div>
      )}
      {reviewData.isMine && (
        <div>
          <Link to={`/edit/${id}`} state={{ reviewData: reviewData }}>
            編集する
          </Link>
          <br></br>
          <Link to="/" onClick={async () => await deleteBook(token, id)}>
            削除する
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetailReview;
