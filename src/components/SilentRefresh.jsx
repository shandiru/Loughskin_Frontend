import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { refreshSuccess, logout } from "../store/slices/authSlice";
import config from "../config";

export default function SilentRefresh({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const tryRefresh = async () => {
      if (!accessToken) {
        try {
          const res = await axios.post(
            `${config.API_BASE_URL}/customer/auth/refresh`,
            {},
            { withCredentials: true }
          );
          dispatch(refreshSuccess({ accessToken: res.data.accessToken, user: res.data.user }));
        } catch {
          dispatch(logout());
        } finally {
          setChecked(true);
        }
      } else {
        setChecked(true);
      }
    };
    tryRefresh();
  }, [accessToken, dispatch]);

  if (!checked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="mb-6 animate-pulse">
          <img src="/logo.webp" alt="Lough Skin" className="w-32 h-auto object-contain" />
        </div>
        <div className="border-4 border-[#F5EDE4] border-t-[#22B8C8] rounded-full w-10 h-10 animate-spin" />
      </div>
    );
  }

  return children;
}