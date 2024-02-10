// src/components/Navigation.tsx
import React from "react";
import Light from "./svgs/Light";
import Dark from "./svgs/Dark";
import { useTheme } from "context/ThemeContext";
import { useTranslation } from "react-i18next";
import Globe from "./svgs/Globe";
import Button from "./button";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfigRoutes } from "config/routes.config";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const Company = "One Line Story";

  const ToggleButton = () => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleTheme();
        }}
        theme={theme === "dark"}
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <Light className="h-6 w-6 text-sky-50" aria-hidden="true" />
        ) : (
          <Dark className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>
    );
  };

  return (
    <header>
      <nav
        className="fixed nav top-0 left-0 right-0 mx-auto flex max-w-screen-2xl items-center justify-between py-6 lg:px-4 z-30"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 px-3">
          {location.pathname !== "/" && (
            <div
              onClick={() => navigate(ConfigRoutes.HOME)}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">{Company}</span>
              <img
                className="shadow-md"
                width={65}
                height={65}
                src={"/logo.png"}
                alt={Company}
              />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex items-center mr-3">
            <Globe className="text-white mr-2" />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={i18n.language !== "de"}
                onChange={() => {
                  changeLanguage(i18n.language === "de" ? "en" : "de");
                }}
              />
              <div
                className={`${
                  i18n.language === "de" && "justify-end"
                } px-[6px] flex w-14 h-8 text-black items-center dark:text-white bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#09d3abe9] dark:peer-focus:ring-[#d2c73650] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600`}
              >
                <span className="my-auto">
                  {i18n.language !== "de" ? "DE" : "EN"}
                </span>
              </div>
            </label>
          </div>
          {ToggleButton()}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
