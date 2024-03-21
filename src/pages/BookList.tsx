import { useEffect } from "react";
import { getBookList, getPublicBookList, getUser, postLogs } from "../api";

import "./booklist.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addList,
  changeLoginStatus,
  setToken,
  setUser,
} from "../redux/listSlice";
import Pagination from "../components/ListPagination";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
  type List = {
    detail: string;
    id: string;
    review: string;
    reviewer: string;
    title: string;
    url: string;
  };

  const list: List[] = useSelector((state: RootState) => state.list.list);
  const page = useSelector((state: RootState) => state.list.page);
  const token = useSelector((state: RootState) => state.list.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // localStorage.clear();

  const handleClickReview = async (id: string) => {
    const res = await postLogs(token, id);
    console.log(res);
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    (async () => {
      if (token) {
        const res = await getUser(token);
        if (res.hasOwnProperty("name")) {
          dispatch(setUser({ name: res.name, icon: res.iconUrl }));
          dispatch(changeLoginStatus(true));
          dispatch(setToken(token));

          // レビュー取得(トークンあり)
          const data = await getBookList(token, page * 10 - 10);
          dispatch(addList(data));
        } else {
          // レビュー取得(トークン無効) ログイン画面にとばす
          const data = await getPublicBookList(page * 10 - 10);
          dispatch(addList(data));
        }
      } else {
        // レビュー取得(トークンなし)
        const data = await getPublicBookList(page * 10 - 10);
        dispatch(addList(data));
      }
    })();
  }, [page]);

  return (
    <div>
      <Header />
      <Link to="/new">レビュー登録</Link>
      {list.length !== 0 &&
        list.map((book) => {
          return (
            <div
              className="review-container"
              onClick={() => handleClickReview(book.id)}
              key={book.id}
            >
              <div className="review-block">
                <div className="review-block__title">{book.title}</div>
                <div className="review-block__reviewer">{book.reviewer}</div>
              </div>
            </div>
          );
        })}
      <Pagination />
    </div>
  );
};

export default BookList;
