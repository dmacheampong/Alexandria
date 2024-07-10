import { InputHTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
};

export const DebouncedInput = ({ value: intialValue, onChange, debounce=100, ...props }: Props) => {
    const [value, setValue] = useState(intialValue);

    // Set value if initialValue changes
    useEffect(() => {
        setValue(intialValue);
    }, [intialValue]);

    // Debounce onChange
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => {
            clearTimeout(timeout)
        };
    }, [value, onChange, debounce]);

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)}/>
  )
}
