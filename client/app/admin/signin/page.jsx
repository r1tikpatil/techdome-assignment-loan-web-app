"use client";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";
import SignInPage from "../../../components/Signin";
import Loader from "@/components/Loader";

import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, logOutUser, signInAdmin } = useContext(GlobalContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });

  if (user && user.isAdmin !== true) {
    logOutUser();
    router.push("/");
    return;
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInAdmin(values);

      if (res.success) {
        successMessageToast(res.message);
        setTimeout(() => {
          setLoading(false);
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        errorMessageToast(res.message);
        setLoading(false);
      }
    } catch (err) {
      errorMessageToast(err);
    }
  };

  return (
    <>
      {loading && <Loader color="rgba(0,0,0,0.6)" />}
      <SignInPage
        handleLogin={handleLogin}
        values={values}
        setValues={setValues}
        url={"/admin/signup"}
      />
    </>
  );
};

export default SignIn;
