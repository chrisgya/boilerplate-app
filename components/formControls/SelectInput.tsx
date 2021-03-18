import React, { FC } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

interface IOption {
  value: string | number;
  display: string;
}

type SelectInputProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label: string;
  name: string;
  selectOption: IOption[];
};

const SelectInput: FC<SelectInputProps> = ({ name, label, selectOption }) => {
  const { register, formState } = useFormContext();

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div
        className={cx(
          "border-0 p-1.5 my-0.5",
          formState.touched[name] && formState.errors[name] && "errorControl"
        )}
      >
        <select name={name} id={name} ref={register}>
          {selectOption.map((v, k) => (
            <option key={k} value={v.value}>
              {v.display}
            </option>
          ))}
        </select>

        {formState.touched[name] && formState.errors[name] && (
          <p className="errorText">{formState.errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export { SelectInput };
