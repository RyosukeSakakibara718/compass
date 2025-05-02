"use client";
import React from "react";
import styles from "./SearchBox.module.scss";
import { Search } from "lucide-react";
import Image from "next/image";

interface SearchBoxProps {
  // 初期入力値
  initialValue: string;
  // 検索実行時に呼び出すコールバック
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ initialValue, onSearch }) => {
  const [inputValue, setInputValue] = React.useState(initialValue);
  // 親側の初期値が変わったらローカル state を更新
  React.useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <Image
          className={styles.titleIcon}
          src="/teacher.svg"
          alt="先生アイコン"
          width={16}
          height={16}
        />
        <span className={styles.titleText}>先生</span>
      </div>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="名前、ログインIDで検索"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Search
          onClick={() => onSearch(inputValue)}
          className={styles.searchIcon}
        />
      </div>
    </div>
  );
};

export default SearchBox;
