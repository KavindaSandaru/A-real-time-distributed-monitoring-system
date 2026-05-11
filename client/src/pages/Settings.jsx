import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";

export default function Settings() {

  const [theme, setTheme] =
    useState("dark");

  const [language, setLanguage] =
    useState("english");

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    const savedLanguage =
      localStorage.getItem("language");

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

  }, []);

  const applyAppearance = () => {

    localStorage.setItem(
      "theme",
      theme
    );

    if (theme === "light") {

      document.documentElement.classList.add(
        "light"
      );

    } else {

      document.documentElement.classList.remove(
        "light"
      );

    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

  };

  const applyLanguage = () => {

    localStorage.setItem(
      "language",
      language
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

  };

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-3">
            Settings
          </h1>

          <p className="text-slate-400 mb-10 text-lg">
            Manage dashboard preferences
          </p>

          {/* Appearance */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-8">
              Appearance
            </h2>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xl font-semibold">
                  Theme Mode
                </p>

                <p className="text-slate-400 mt-2">
                  Select your dashboard appearance
                </p>

              </div>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    setTheme("dark")
                  }
                  className={`px-6 py-3 rounded-xl transition ${
                    theme === "dark"
                      ? "bg-blue-600"
                      : "bg-slate-800"
                  }`}
                >

                  Dark

                </button>

                <button
                  onClick={() =>
                    setTheme("light")
                  }
                  className={`px-6 py-3 rounded-xl transition ${
                    theme === "light"
                      ? "bg-blue-600"
                      : "bg-slate-800"
                  }`}
                >

                  Light

                </button>

                <button
                  onClick={applyAppearance}
                  className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl font-semibold"
                >

                  Apply

                </button>

              </div>

            </div>

          </div>

          {/* Language */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Language
            </h2>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xl font-semibold">
                  Dashboard Language
                </p>

                <p className="text-slate-400 mt-2">
                  Select preferred language
                </p>

              </div>

              <div className="flex gap-4">

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value
                    )
                  }
                  className="bg-[#020817] border border-slate-700 px-5 py-3 rounded-xl outline-none"
                >

                  <option value="english">
                    English
                  </option>

                  <option value="spanish">
                    Spanish
                  </option>

                  <option value="french">
                    French
                  </option>

                  <option value="german">
                    German
                  </option>

                </select>

                <button
                  onClick={applyLanguage}
                  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
                >

                  Apply

                </button>

              </div>

            </div>

          </div>

          {/* Saved */}
          {saved && (

            <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl">

              Settings updated successfully

            </div>

          )}

        </div>

      </main>

    </div>
  );
}