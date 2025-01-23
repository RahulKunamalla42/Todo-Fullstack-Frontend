import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const ErrorPage = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-[15rem] text-center bg-gray-100">
      <Typography
        variant="h1"
        component="h1"
        className="text-6xl font-bold mb-4 animate-bounce"
      >
        404
      </Typography>
      <Typography variant="h5" component="h2" className="text-2xl mb-4">
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" className="mt-4" href="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
