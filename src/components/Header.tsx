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
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <h1>書籍レビューアプリ</h1>
        {loginStatus ? (
          <div>
            <ul className="nav__wrapper">
              <li className="nav__item">
                <img src={user.icon} alt="icon" style={{ width: "30px" }}></img>
              </li>
              <li className="nav__item">{user.name}</li>
              <li className="nav__item">
                <Link to="/profile">登録情報編集</Link>
              </li>
              <li className="nav__item">
                <Link to="/login" onClick={() => handleLogoutClick()}>
                  ログアウト
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <nav className="nav">
            <ul className="nav__wrapper">
              <li className="nav__item">
                <Link to="/login">ログイン</Link>
              </li>
              <li className="nav__item">
                <Link to="/signup">サインアップ</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
