import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProviders";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../Providers/AuthProviders";
// import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children, redirectTo = "/auth/login" }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // If the app is still loading (e.g., checking if the user is authenticated), show the loading spinner
  if (loading) {
    return <Loading />;
  }

  // If the user is authenticated, return the protected content
  if (user && user.email) {
    return children;
  }

  // If the user is not authenticated, redirect to the login page with the state of the current location
  return (
    <Navigate
      to={redirectTo}
      state={{ from: location }} // This will store the previous location and can be used to redirect back after login
    />
  );
};

export default PrivateRoute;
