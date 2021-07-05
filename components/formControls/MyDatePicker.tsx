import { Controller, useFormContext } from "react-hook-form";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import cx from "classnames";

export const MyDatePicker = ({ label, name }: { label: string; name: any }) => {
  const { control, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            className={cx(formState.errors[name] && "errorControl")}
          />
        )}
      />
      {!!formState.errors[name] && (
        <p className="errorText">{formState.errors[name].message}</p>
      )}
    </div>
  );
};
