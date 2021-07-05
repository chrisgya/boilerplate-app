const DateTimePicker = require('react-datetime-picker/dist/entry.nostyle');

import { Controller, useFormContext } from "react-hook-form";
import cx from "classnames";

export const MyDateTimePicker = ({ label, name, value }: { label: string; name: any; value: any }) => {
  const { control, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <DateTimePicker
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
