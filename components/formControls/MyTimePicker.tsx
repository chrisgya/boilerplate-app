import React from "react";
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import { Controller, useFormContext } from "react-hook-form";
import cx from "classnames";

export const MyTimePicker = ({ label, name, value }: { label: string; name: string; value: any }) => {
  const { control, formState } = useFormContext();

  return (
    <div className="block my-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <Controller
        as={TimePicker}
        control={control}
        name={name}
        value={value}
        className={cx(formState.touched[name] && formState.errors[name] && "errorControl")}
      />
      {!!formState.touched[name] && !!formState.errors[name] && (
        <p className="errorText">{formState.errors[name].message}</p>
      )}
    </div>
  );
};
