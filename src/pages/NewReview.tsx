import { Link } from "react-router-dom";
import Header from "../components/Header";

const NewReview = () => {
  return (
    <div>
      <Header />
      <Link to="/">一覧画面に戻る</Link>
    </div>
  );
};

export default NewReview;
