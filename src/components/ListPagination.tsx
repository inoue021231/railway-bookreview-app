import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Pagination } from "@mui/material";
import { changePage } from "../redux/listSlice";

const ListPagination = () => {
  const list = useSelector((state: RootState) => state.list.list);
  const page = useSelector((state: RootState) => state.list.page);
  const dispatch = useDispatch();

  const calcPageCount = () => {
    if (list.length === 0) {
      return 1;
    } else {
      return Math.ceil(list.length / 10);
    }
  };

  return (
    <div>
      <Pagination
        count={calcPageCount()}
        page={page}
        onChange={(_, value) => dispatch(changePage(value))}
      />
    </div>
  );
};

export default ListPagination;
