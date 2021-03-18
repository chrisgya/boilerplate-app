import React from "react";
import cx from "classnames";
import Spin from "../../public/Spin";

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  useHalfWith?: boolean;
  isBusy?: boolean;
};

export const Button = ({ name, type, onClick, useHalfWith, isBusy, ...rest }: IButtonProps) => {

  return (
    <div className="flex w-full">
      <button type={type} onClick={onClick} {...rest}
        className={cx("inline-flex justify-center items-center w-full px-8 py-2 mt-2 font-semibold transition duration-500 ease-in-out transform rounded-sm shadow-xl focus:ring focus:outline-none",
          type === "submit" ? "text-white bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700" :
            "bg-white border hover:border-gray-100 hover:bg-gray-100", useHalfWith && "lg:w-1/2", isBusy && "cursor-not-allowed")}>
        {isBusy ? <><span className="w-5 h-5 mr-1 font-bold text-white"><Spin /></span> Processing</> : name}
      </button>
    </div>
  );
};