import React from "react";
import styles from "./TeacherList.module.scss";
import { Facilitator } from "@/types/facilitator";
import { ChevronDown } from "lucide-react";

// ソートキーとオーダー
type SortKey = "name" | "loginId";
type Order = "asc" | "desc";

interface TeacherListProps {
  teachers: Facilitator[];
  sortKey: SortKey;
  order: Order;
  onSortChange: (key: SortKey, order: Order) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({
  teachers,
  sortKey,
  order,
  onSortChange,
}) => {
  if (teachers.length === 0) {
    return <p className={styles.empty}>該当するデータがありません。</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th
            className={`${styles.headerCell} ${sortKey === "name" ? styles.headerCellActive : ""}`}
            onClick={() =>
              onSortChange(
                "name",
                sortKey === "name" && order === "asc" ? "desc" : "asc"
              )
            }
          >
            <div className={styles.sortButton}>
              <p>名前</p>
              <ChevronDown
                className={styles.chevron}
                style={{ transform: sortKey === 'name' && order === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>
          </th>
          <th
            className={`${styles.headerCell} ${sortKey === "loginId" ? styles.headerCellActive : ""}`}
            onClick={() =>
              onSortChange(
                "loginId",
                sortKey === "loginId" && order === "asc" ? "desc" : "asc"
              )
            }
          >
            <div className={styles.sortButton}>
              <p>ログインID</p>
              <ChevronDown
                className={styles.chevron}
                style={{ transform: sortKey === 'loginId' && order === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>
          </th>
          <th　className={styles.headerCell}></th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.loginId}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherList;
