import React, { FC } from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import cx from "classnames";
import { Controller, useFormContext } from "react-hook-form";

type InputFormatProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    NumberFormatProps & {
        label: string;
        name: any;
    };

//can be use for password, numbers, amount, phone, credit card and any other format...reference documentation for more details
//https://www.npmjs.com/package/react-number-format
const InputFormat: FC<InputFormatProps> = ({
    label,
    name,
    type,
    thousandSeparator,
    decimalSeparator,
    allowNegative,
    prefix,
    suffix,
    format,
    mask,
    allowEmptyFormatting,
    decimalScale,
    isNumericString,
}) => {
    const { control, formState } = useFormContext();

    return (
        <div className="block my-3">
            {label && <label className="block" htmlFor={name}>
                {label}
            </label>
            }
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <NumberFormat
                        type={type}
                        onChange={onChange}
                        value={value}
                        className={cx(formState.errors[name] && "errorControl")}
                        thousandSeparator={thousandSeparator}
                        decimalSeparator={decimalSeparator}
                        allowNegative={allowNegative}
                        prefix={prefix}
                        suffix={suffix}
                        format={format}
                        mask={mask}
                        decimalScale={decimalScale}
                        allowEmptyFormatting={allowEmptyFormatting}
                        isNumericString={isNumericString}
                    // onValueChange={(values) => {
                    //     const {formattedValue, value} = values;
                    //     // formattedValue = $2,223
                    //     // value ie, 2223
                    //     this.setState({profit: formattedValue})
                    //   }}
                    />
                )}
            />
            {formState.errors[name] && (
                <p className="errorText">
                    {formState.errors[name].message}
                </p>
            )}
        </div>
    );
};

export { InputFormat };
