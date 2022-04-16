export const Card = ({ children }) => {
  return (
    <div className="p-4 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
      {children}
    </div>
  )
}
