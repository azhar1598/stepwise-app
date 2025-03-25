"use client";
import { Text, ActionIcon } from "@mantine/core";
import { Menu } from "lucide-react";
import { useState } from "react";
import Navigation from "../Navigation";
import logo from "../../../../public/stepwise-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const query = useSearchParams();

  const cameraOpen = query.get("cameraOpen");
  console.log("cameraOpen---->", cameraOpen);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <div
        className={`bg-white border-b border-gray-200 py-4 px-4 flex justify-between items-center sticky top-0 z-[1000] `}
        style={{
          display: cameraOpen == "true" ? "none" : "flex",
        }}
      >
        <Link href="/">
          <Image src={logo} alt="logo" width={150} height={150} />
        </Link>
        <ActionIcon variant="subtle" size="lg" onClick={toggleNav}>
          <Menu size={24} />
        </ActionIcon>
      </div>
      <Navigation navOpen={navOpen} setNavOpen={setNavOpen} />
    </>
  );
}
