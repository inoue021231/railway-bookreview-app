import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { resetListSlice } from "../redux/listSlice";

const Header = () => {
  const loginStatus = useSelector((state: RootState) => state.list.loginStatus);
  const user = useSelector((state: RootState) => state.list.user);
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    dispatch(resetListSlice());
  };
  return (
    <header className="header-section">
      <h1>書籍レビューアプリ</h1>
      {loginStatus ? (
        <div>
          <ul className="header-section__nav-wrapper">
            <li className="header-section__nav-wrapper--item">
              <img src={user.icon} alt="icon" style={{ width: "30px" }}></img>
            </li>
            <li className="header-section__nav-wrapper--item">{user.name}</li>
            <li className="header-section__nav-wrapper--item">
              <Link to="/profile">登録情報編集</Link>
            </li>
            <li className="header-section__nav-wrapper--item">
              <Link to="/login" onClick={() => handleLogoutClick()}>
                ログアウト
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <ul className="header-section__nav-wrapper">
          <li className="header-section__nav-wrapper--item">
            <Link to="/login">ログイン</Link>
          </li>
          <li className="header-section__nav-wrapper--item">
            <Link to="/signup">サインアップ</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
