"use client";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.left}>
          <Image src="/header-logo.png" alt="logo" width={276.5} height={32} />
      </div>
      <button
        onClick={() => router.push("/facilitators")}
        className={styles.accountButton}
      >
        アカウント管理
      </button>
      <div className={styles.right}>
        <UserRound className={styles.avatar} />
        <span className={styles.userName}>因幡深雪</span>
      </div>
    </header>
  );
};

export default Header;
