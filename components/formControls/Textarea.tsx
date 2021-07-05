import cx from "classnames";
import { useFormContext } from "react-hook-form";

type TextAreaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label?: string;
  name: any;
};

const Textarea = ({ name, label, ...rest }: TextAreaProps) => {
  const { register, formState } = useFormContext();

  return (
    <div className="block my-3">
      {label && <label className="block" htmlFor={name}>
        {label}
      </label>}
      <textarea
        className={cx(
          "border-0 w-full p-1.5 my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-md",
          formState.errors[name] && "border-red-600 border border-solid"
        )}
        id={name}
        {...register(name)}
        {...rest}
      />
      {formState.errors[name] && (
        <p className="text-red-600">{formState.errors[name].message}</p>
      )}
    </div>
  );
};

export { Textarea };
