import React, { FC, ReactNode, MouseEvent } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  theme: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ theme, onClick, children }) => {

  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 mr-2 ${theme ? styles.neumorphicBtnDark : styles.neumorphicBtnLight
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
