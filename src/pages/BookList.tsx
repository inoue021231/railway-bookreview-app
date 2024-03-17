import { useEffect, useState } from "react";
import { getBookList } from "../api";

import "./booklist.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addList } from "../redux/listSlice";
import Pagination from "../components/ListPagination";

const BookList = () => {
  type List = {
    detail: string;
    id: string;
    review: string;
    reviewer: string;
    title: string;
    url: string;
  };
  const TOKEN = "";

  const list: List[] = useSelector((state: RootState) => state.list.list);
  const page = useSelector((state: RootState) => state.list.page);
  const dispatch = useDispatch();

  const extractedList = list.slice((page - 1) * 10, page * 10);

  useEffect(() => {
    (async () => {
      let index = 0;
      while (index <= 200) {
        const data = await getBookList(TOKEN, index);
        if (data.length === 0) {
          break;
        }
        index += 10;
        dispatch(addList(data));
      }
    })();
  }, []);
  return (
    <div>
      {extractedList.length !== 0 &&
        extractedList.map((book) => {
          return (
            <div className="review-container" key={book.id}>
              <div className="review-block">
                <div className="review-block__title">{book.title}</div>
                {/* <div className="review-block__detail">{book.detail}</div>
              <div className="review-block__url">{book.url}</div>
              <div className="review-block__reviewer">{book.reviewer}</div>
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
