import classNames from "classnames";
import { useField } from "formik";


export const Input = (props) => {
  const { error, className, ...rest } = props;

  return (
    <input
      className={classNames(className, "rounded input w-full max-w-xs min-w-[30rem]   border px-2 py-2 text-xl", {
        "border-gray-300": !error,
        "border-red-500": error,
      })}
      {...rest}
    />
  );
};


const FormikInput = (props) => {
  const [, { error, value }, { setValue }] = useField(props.name);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={error}
      {...props}
    />
  );
};

export default FormikInput;
