import { useEffect } from "react";
import { getBookList, getPublicBookList, getUser } from "../api";

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
import { Link } from "react-router-dom";

const BookList = () => {
  const REVIEW_COUNT = 100;

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
  const dispatch = useDispatch();

  // localStorage.clear();

  const extractedList = list.slice((page - 1) * 10, page * 10);

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
          let index = 0;
          while (index < REVIEW_COUNT) {
            const data = await getBookList(token, index);
            if (data.length === 0) {
              break;
            }
            index += 10;
            dispatch(addList(data));
          }
        } else {
          // レビュー取得(トークン無効)
          let index = 0;
          while (index < REVIEW_COUNT) {
            const data = await getPublicBookList(index);
            if (data.length === 0) break;
            dispatch(addList(data));
            index += 10;
          }
        }
      } else {
        // レビュー取得(トークンなし)
        let index = 0;
        while (index < REVIEW_COUNT) {
          const data = await getPublicBookList(index);
          if (data.length === 0) break;
          dispatch(addList(data));
          index += 10;
        }
      }
    })();
  }, []);
  return (
    <div>
      <Header />
      <Link to="/new">レビュー登録</Link>
      {extractedList.length !== 0 &&
        extractedList.map((book) => {
          return (
            <div className="review-container" key={book.id}>
              <div className="review-block">
                <div className="review-block__title">{book.title}</div>
                <div className="review-block__reviewer">{book.reviewer}</div>
                {/* <div className="review-block__detail">{book.detail}</div>
              <div className="review-block__url">{book.url}</div>
              
              <div className="review-block__reivew">{book.review}</div> */}
              </div>
            </div>
          );
        })}
      <Pagination />
    </div>
  );
};

export default BookList;
