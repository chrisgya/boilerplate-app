import React, { FC } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

type CheckboxProps = React.DetailedHTMLProps<any, any> & {
  label: string;
  name: string;
  disabled?: boolean;
};

const Checkbox: FC<CheckboxProps> = ({ name, label, disabled, ...rest }) => {
  const { register, formState } = useFormContext();

  return (
    <div className="field">
      <div className="control">
        <label className={cx("checkbox", formState.touched[name] && formState.errors[name] && "text-red-600")}>
          <input type="checkbox" name={name} id={name} disabled={disabled} ref={register} {...rest} />
          {label}
        </label>
        {formState.touched[name] && formState.errors[name] && (
          <p className="text-red-600" role="alert">
            {formState.errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
};

export { Checkbox };
