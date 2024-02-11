// Modal.tsx

import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";
import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const { t } = useContentfulMediaTranslations();
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  return isOpen ? (
    <>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000095]"
        onClick={onClose}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white nav dark:bg-[#00000080] dark:border dark:border-gray-400 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 dark:border-gray-400 rounded-t ">
              <h3 className="text-3xl font=semibold">{title}</h3>
              <button
                className="bg-transparent border-0 float-right"
                onClick={onClose}
              >
                <span className="flex opacity-7 h-8 w-8 p-1 text-xl items-end justify-center font-bold bg-red-300 dark:bg-transparent dark:border dark:border-cyan-400 rounded-full">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto max-h-80 overflow-y-auto">
              {children}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className={`text-white bg-yellow-500 dark:border dark:border-yellow-500 dark:bg-transparent dark:text-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                type="button"
                onClick={onClose}
              >
                {t["@T_Done"]?.value}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
