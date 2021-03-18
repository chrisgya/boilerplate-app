import { Controller, useFormContext } from "react-hook-form";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import cx from "classnames";

export const MyDatePicker = ({ label, name }: { label: string; name: string }) => {
  const { control, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <Controller
        as={DatePicker}
        control={control}
        name={name}
        className={cx(formState.touched[name] && formState.errors[name] && "errorControl")}
      />
      {!!formState.touched[name] && !!formState.errors[name] && (
        <p className="errorText">{formState.errors[name].message}</p>
      )}
    </div>
  );
};
