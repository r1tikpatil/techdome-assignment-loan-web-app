"use client";
import React, { useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Button = ({ href, label, colors }) => {
  return (
    <Link legacyBehavior href={href}>
      <a
        className={`text-center text-lg px-4 mr-4 lg:mr-8 h-10 w-40 py-2 mb-4 rounded-md shadow-md flex items-center justify-center ${colors}`}
      >
        {label}
      </a>
    </Link>
  );
};

const CenteredLinks = () => {
  const { user, logOutUser } = useContext(GlobalContext);
  const router = useRouter();
  if (!user) {
    router.push("/user/signin");
    return;
  } else if (user.isAdmin === true) {
    logOutUser();
    router.push("/user/signin");
    return;
  }
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center min-h-screen">
      <Button
        href="/user/createloan"
        label="Create Loan"
        colors="bg-blue-500 text-white hover:bg-blue-600"
      />
      <Button
        href="/user/viewloans"
        label="View Loans"
        colors="bg-pink-500 text-white hover:bg-pink-600"
      />
    </div>
  );
};

export default CenteredLinks;
