import React, { FC } from 'react';
import cx from 'classnames';
import { useFormContext } from 'react-hook-form';

type RadioProps = React.DetailedHTMLProps<any, any> & {
    label: string;
    name: string;
    disabled?: boolean;
};

const Radio: FC<RadioProps> = ({ name, label, disabled, value }) => {
    const { register, formState } = useFormContext();

    return (
        <div className="field">
            <div className="control">
                <label
                    className={cx(
                        'radio',
                        formState.touched[name] && formState.errors[name] && 'is-danger',
                    )}
                >
                    <input
                        type="radio"
                        name={name}
                        disabled={disabled}
                        value={value}
                        ref={register}
                    />
                    {label}
                </label>
                {formState.touched[name] && formState.errors[name] && (
                    <p className="help is-danger" role="alert">
                        {formState.errors[name].message}
                    </p>
                )}
            </div>
        </div>
    );
};

export { Radio };
