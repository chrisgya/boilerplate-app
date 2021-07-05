import React, { useState } from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon, faEye, faEyeSlash } from "../../utils";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "password";
  topClass?: string;
  dontShowError?: boolean;
};

const Input = ({ label, name, dontShowError, type, placeholder, onBlur, topClass, ...rest }: InputProps) => {
  const { formState, register } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative block my-3">
      {label && <label className="block" htmlFor={name}>
        {label}
      </label>
      }
      <input
        className={cx(formState.errors[name] && !dontShowError && "errorControl")}
        type={type === 'password' ? (open ? 'text' : type) : type}
        {...register(name)}
        id={name}
        placeholder={placeholder}
        onBlur={onBlur}
        {...rest}
      />
      {type === 'password' && <span className={cx("absolute cursor-pointer right-1", topClass ? topClass : "top-3")}> {open ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setOpen(prv => !prv)} /> : <FontAwesomeIcon icon={faEye} onClick={() => setOpen(prv => !prv)} />}</span>}

      {!!formState.errors[name] && !dontShowError && (
        <p className="errorText">{formState.errors[name].message}</p>
      )}
    </div>
  );
};

export { Input };


/*

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { formState, register } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative block my-3">
      {props.label && <label className="block" htmlFor={props.name}>
        {props.label}
      </label>
      }
      <input
        className={cx(
          formState.touchedFields[props.name] && formState.errors[props.name] && !props.dontShowError && "errorControl"
        )}
        type={props.type === 'password' ? (open ? 'text' : props.type) : props.type}
        {...register(props.name)}
        id={props.name}
        placeholder={props.placeholder}
        ref={ref}
        onBlur={props.onBlur}
      />
      {props.type === 'password' && <span className={cx("absolute cursor-pointer right-1", props.topClass ? props.topClass : "top-3")}> {open ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setOpen(prv => !prv)} /> : <FontAwesomeIcon icon={faEye} onClick={() => setOpen(prv => !prv)} />}</span>}

      {!!formState.touchedFields[props.name] && !!formState.errors[props.name] && !props.dontShowError && (
        <p className="errorText">{formState.errors[props.name].message}</p>
      )}
    </div>
  );
});

export { Input };
*/