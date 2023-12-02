"use client";
import React, { useState, useContext } from "react";
import GlobalContext from "@/actions/context";
import { useRouter } from "next/navigation";
import SignUpPage from "@/components/Signup";
import Loader from "@/components/Loader";

import {
  successMessageToast,
  errorMessageToast,
} from "@/actions/toastMessages";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const { user, logOutUser, signUpUser } = useContext(GlobalContext);

  if (user && user.isAdmin === true) {
    logOutUser();
    router.push("/");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password.length < 8) {
      errorMessageToast("Password should be of more then 8 characters!");
      return;
    }

    try {
      setLoading(true);
      const response = await signUpUser(values);
      if (response.success) {
        successMessageToast(response.message);
        setTimeout(() => {
          setLoading(false);
          router.push("/user/signin");
        }, 1000);
      } else {
        setLoading(false);
        errorMessageToast(response.message);
      }
    } catch (err) {
      errorMessageToast(err);
    }
  };

  return (
    <>
      {loading && <Loader color="rgba(0,0,0,0.6)" />}
      <SignUpPage
        handleSubmit={handleSubmit}
        values={values}
        setValues={setValues}
        url={"/user/signin"}
      />
    </>
  );
};

export default SignUp;
