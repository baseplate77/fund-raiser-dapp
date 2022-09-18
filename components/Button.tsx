import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text";
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "filled",
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonStyle = getButtonStyle(variant);

  return (
    <button className={buttonStyle + className} {...props}>
      {children}
    </button>
  );
};

const getButtonStyle = (variant: string) => {
  if (variant === "filled") return filledStyle;
  else if (variant === "outlined") return outlinedStyle;
  else return textStyle;
};

const buttonPressEffect = "active:transform active:scale-90 transition-all ";

const filledStyle =
  "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 " +
  buttonPressEffect;

const outlinedStyle =
  "py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" +
  buttonPressEffect;

const textStyle =
  "py-2 px-4 text-sm font-medium text-blue-700 rounded-full hover:text-blue-800 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" +
  buttonPressEffect;
