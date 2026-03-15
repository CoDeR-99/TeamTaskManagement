import Row from "antd/es/row";
import Col from "antd/es/col";
import SearchBar from "../searchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isDasboard = location.pathname === "/tasks";

  return (
    <div className="headerContainer">
      <Row>
        <Col className="heading" span={16}>
          <Link to={"/tasks"}>
            {"Task Manager"}
          </Link>
        </Col>
        {isDasboard && (
          <Col className="search-container" span={8}>
            <SearchBar />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Header;
