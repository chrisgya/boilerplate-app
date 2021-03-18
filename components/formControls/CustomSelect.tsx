import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect, { CommonProps } from "react-select";
import cx from "classnames";

type CustomSelectProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
    Partial<CommonProps<any, boolean>> & {
        label: string;
        name: string;
        isSearchable?: boolean;
        isClearable?: boolean;
    };

const CustomSelect: FC<CustomSelectProps> = ({
    label,
    name,
    isSearchable,
    isClearable,
    placeholder,
    options,
    isMulti,
}) => {
    const { control, formState } = useFormContext();

    return (
        <div className="block my-3">
            <label className="block" htmlFor={name}>
                {label}
            </label>

            <Controller
                as={ReactSelect}
                control={control}
                name={name}
                placeholder={placeholder}
                options={options}
                isMulti={isMulti}
                isClearable={isClearable}
                isSearchable={isSearchable}
                className={cx("border-0 w-full p-1.5 my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-md", formState.touched[name] && formState.errors[name] && "border-red-600 border border-solid")}
            />
            {formState.touched[name] && formState.errors[name] && (
                <p className="border-red-600">
                    {formState.errors[name].message}
                </p>
            )}
        </div>
    );
};

export { CustomSelect };
