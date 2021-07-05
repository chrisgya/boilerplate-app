import React, { useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cx from "classnames";
import Dropzone from "react-dropzone";

type FileInputProps = React.DetailedHTMLProps<any, any> & {
  name: string;
  setFiles: (files: object[]) => void;
  files: any[];
  label?: string;
  disabled?: boolean;
};


const FileInput = ({ name, files, setFiles, disabled, label, ...rest }: FileInputProps) => {
  const { control } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  useEffect(() => {
    return () => {
      files && files.forEach((file: { preview: string; }) => URL.revokeObjectURL(file.preview));
    };
  });


  return (
    <div className="field">
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field: { onBlur, value } }) => (
          <>
            <Dropzone onDrop={onDrop}>
              {({ isDragActive, getRootProps, getInputProps }) => (
                <div {...getRootProps()}
                  className={cx("border-dashed border-2 p-5 text-center focus:outline-none font-bold text-gray-400 cursor-pointer rounded-lg",
                    isDragActive && " border-blue-500")}
                >
                  <input {...getInputProps()} name={name} onBlur={onBlur} disabled={disabled} {...rest} />
                  <p>{label ? label : `Drag 'n' drop files here, or click to select files`}</p>
                </div>
              )}
            </Dropzone>
            <div>
              {value &&
                value.map((f: any, index: number) => (
                  <div key={index}>
                    <span>{f.name}</span>
                    <span> </span>
                    <span>{f.size}</span>
                  </div>
                ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export { FileInput };
