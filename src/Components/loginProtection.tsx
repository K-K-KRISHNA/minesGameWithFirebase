import { Component } from "react";
import { Navigate } from "react-router-dom";

const loginProtection = (OriginalComponent: React.FC) => {
  class NewComponent extends Component {
    render() {
      const isAuthenticated = localStorage.getItem("activeUserName") !== null;
      if (isAuthenticated) return <Navigate to={"/game"} />;
      return <OriginalComponent />;
    }
  }
  return NewComponent;
};

export default loginProtection;
