export const Button = ({ type, children, onClick, disabled, value, className }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full text-white bg-emerald-700 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-25 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 ${className}`}
      onClick={onClick}
    >
      {children || value}
    </button>
  )
}
