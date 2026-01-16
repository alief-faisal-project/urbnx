import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "last-visited-route";
const EXCLUDED_ROUTES = ["/admin", "/admin-login"];

export const useLastVisitedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Save current route
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (
      consent === "accepted" &&
      !EXCLUDED_ROUTES.some((r) => location.pathname.startsWith(r))
    ) {
      localStorage.setItem(STORAGE_KEY, location.pathname + location.search);
    }
  }, [location]);

  // Restore last route on first visit
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    const lastRoute = localStorage.getItem(STORAGE_KEY);
    const hasRestored = sessionStorage.getItem("route-restored");

    if (
      consent === "accepted" &&
      lastRoute &&
      !hasRestored &&
      location.pathname === "/"
    ) {
      sessionStorage.setItem("route-restored", "true");
      if (lastRoute !== "/") {
        navigate(lastRoute, { replace: true });
      }
    }
  }, []);
};

export default useLastVisitedRoute;
