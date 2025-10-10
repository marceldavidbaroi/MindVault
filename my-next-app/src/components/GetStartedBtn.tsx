"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const GetStartedBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <Button
      variant="contained"
      size="medium"
      color="secondary"
      sx={{
        color: "white",
        px: 6,
        py: 1.5,
        borderRadius: 2,
        fontWeight: 500,
        textTransform: "none",
      }}
      onClick={handleClick}
    >
      Get Started
    </Button>
  );
};

export default GetStartedBtn;
