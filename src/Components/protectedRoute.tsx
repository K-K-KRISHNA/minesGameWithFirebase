import { Component } from "react";
import { Navigate } from "react-router-dom";

const protectedRoute = (OriginalComponent: React.FC) => {
  class NewComponent extends Component {
    render() {
      const isAuthenticated = localStorage.getItem("activeUserName") !== null;
      if (isAuthenticated) return <OriginalComponent />;
      return <Navigate to={"/"} />;
    }
  }
  return NewComponent;
};

export default protectedRoute;
