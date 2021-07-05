import cx from "classnames";
import { useFormContext } from "react-hook-form";

type CheckboxProps = React.DetailedHTMLProps<any, any> & {
  label: string;
  name: any;
  disabled?: boolean;
};

const Checkbox = ({ name, label, disabled, ...rest }: CheckboxProps) => {
  const { register, formState } = useFormContext();

  return (
    <div className="field">
      <div className="control">
        <label className={cx("checkbox", formState.errors[name] && "text-red-600")}>
          <input type="checkbox" id={name} disabled={disabled} {...register(name)} {...rest} />
          {label}
        </label>
        {formState.errors[name] && (
          <p className="text-red-600" role="alert">
            {formState.errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
};

export { Checkbox };
