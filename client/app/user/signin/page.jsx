"use client";
import React, { useState, useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";
import SignInPage from "@/components/Signin";
import Loader from "@/components/Loader";

import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, logOutUser, signInUser } = useContext(GlobalContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  if (user && user.isAdmin === true) {
    logOutUser();
    router.push("/");
    return;
  }
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInUser(values);
      if (res.success) {
        successMessageToast(res.message);
        setTimeout(() => {
          setLoading(false);
          router.push("/user/dashboard");
        }, 1000);
      } else {
        setLoading(false);
        errorMessageToast(res.message);
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
        url={"/user/signup"}
      />
    </>
  );
};

export default SignIn;
