"use client";
import Link from "next/link";
import React, { useContext } from "react";
import GlobalContext from "@/actions/context";

const Navbar = () => {
  const { user, logOutUser } = useContext(GlobalContext);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">
            Loan App
          </Link>

          <div className="space-x-4">
            {!user ? null : (
              <>
                {user.isAdmin ? (
                  <Link href="/admin/requests" className="text-white">
                    View Requests
                  </Link>
                ) : (
                  <>
                    <Link href="/user/viewloans" className="text-white">
                      View Loans
                    </Link>
                    <Link href="/user/createloan" className="text-white">
                      Create Loans
                    </Link>
                  </>
                )}
              </>
            )}
            {!user ? (
              <>
                <Link href="/user/signin" className="text-white">
                  User
                </Link>
                <Link href="/admin/signin" className="text-white">
                  Admin
                </Link>
              </>
            ) : (
              <Link href="/" className="text-white">
                <span onClick={logOutUser}>Log Out</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
