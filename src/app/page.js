"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"; // Optional: use if you have styles

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Image
        src="/motor.png"
        alt="Motor Logo"
        width={400}
        height={400}
        priority
      />

      <Link
        href="/product"
        style={{
          fontSize: "1.2rem",
          color: "#0070f3",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        View Products →
      </Link>
    </div>
  );
}
