import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getTaskList } from "../../utilities/commonFunctions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncing = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearch = debouncing((typeWord: string, dispatch: AppDispatch) => {
    getTaskList(dispatch, typeWord);
  }, 500);

  return (
    <>
      <Select
        allowClear
        showSearch={{ filterOption: false, onSearch: (value: string) => handleSearch(value, dispatch) }}
        open={false}
        placeholder={"Enter Title to Search Task"}
        suffixIcon={<SearchOutlined />}
        options={undefined}
        className="search-bar"
      />
    </>
  );
};

export default SearchBar;
