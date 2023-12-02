"use client";
import Link from "next/link";
import React, { useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";

const CenteredLinks = () => {
  const { user, logOutUser } = useContext(GlobalContext);
  const router = useRouter();
  if (!user) {
    router.push("/admin/signin");
    return;
  } else if (user.isAdmin !== true) {
    logOutUser();
    router.push("/");
    return;
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <Link href="/admin/requests">
          <div className="block text-center text-xl px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:bg-purple-800 hover:text-white shadow-md">
            View Requests
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CenteredLinks;
