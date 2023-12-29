

const Button = (props) => {
  const { loading, disabled, children, ...rest } = props;

  return (
    <button
      className="h-12 rounded-lg bg-black px-4 py-2 text-xl min-w-[30rem]  font-semibold text-white"
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Busy..." : children}
    </button>
  );
};

export default Button;
