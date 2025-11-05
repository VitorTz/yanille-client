import { LogOut } from "lucide-react";
import { api } from "../services/TzHarApi";
import { useUser } from "../context/AuthContext";
import { useView } from "../context/ViewContext";
import { useUrlTags } from "../context/TagContext";
import { useUrls } from "../context/UrlsContext";

export default function Header() {
  const { setTags } = useUrlTags();
  const { setUrls } = useUrls();
  const { user, logout } = useUser();
  const { resetView } = useView();

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      logout();
      setTags([])
      setUrls([])
      resetView();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon_io/android-chrome-192x192.png" width={40} height={40} />
            <h1 className="text-xl font-bold text-slate-900">Yanille</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-slate-600 hidden sm:inline">
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
