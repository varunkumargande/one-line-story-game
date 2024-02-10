// src/pages/Home.tsx
import React from "react";
import styles from "./ShowGameCard.module.css";
import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";

interface ShowGameCardProps {
  title: string;
  className: string;
  image: string;
  showInstructions: () => void;
  onClick: () => void;
}

export const ShowGameCard = ({
  title,
  className,
  image,
  showInstructions,
  onClick,
}: ShowGameCardProps) => {
  const { t } = useContentfulMediaTranslations();

  return (
    <div
      onClick={onClick}
      className={`${styles.card} md:w-fit sm:w-full m-3 bg-white dark:bg-[#0000008c] rounded-md overflow-hidden shadow-xl dark:shadow-xl-dark transition-transform duration-300 transform hover:translate-y-5 ${className} cursor-pointer`}
    >
      <div className="p-6">
        <div className="flex items-center">
          <div>
            <div className="lg:h-48 lg:w-56 h-auto border border-gray-300 overflow-hidden">
              <img
                src={image}
                className="object-contain h-full w-full"
                alt={title}
              />
            </div>

            <h4 className="text-xl font-semibold text-gray-800 dark:text-sky-400">
              {title}
            </h4>
            <div className="grid md:block">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showInstructions();
                }}
                className="border-gray-300 border py-2 px-4 m-1 rounded btn bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {t["@T_Instructions"]?.value}
              </button>
              <button
                onClick={onClick}
                className="border-gray-300 border py-2 px-4 m-1 rounded btn bg-blue-200 text-gray-600 dark:bg-[#0000008c] dark:text-white"
              >
                {t["@T_Select"]?.value}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
