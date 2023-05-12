import classNames from "classnames";
const Button = ({ children, ...props }) => {
  // console.log(props);
  return (
    <button
      className={classNames(
        `bg-${props.color}-500 hover:bg-${props.color}-800 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
