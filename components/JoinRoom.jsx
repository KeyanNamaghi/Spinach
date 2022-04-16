import Image from 'next/image'

export const JoinRoom = ({ toggleShow }) => {
  return (
    <div className="p-4 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
      <Image src="/SpinachIcon.png" alt="brand logo" height={200} width={200} />
      <form className="space-y-6 mt-6" action="#">
        <input
          className="min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          placeholder="Enter your name"
          //   onChange={(e) => handleInputName(e.target.value)}
          maxLength={16}
          pattern={'[A-Za-z]'}
        ></input>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Enter the 4 letter room code"
          //   onChange={(e) => handleInputRoom(e.target.value)}
          maxLength={4}
          pattern={'[A-Za-z]'}
        ></input>
        <input
          type="submit"
          value="Join"
          disabled={true}
          className="w-full text-white bg-emerald-700 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-25 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          //   onClick={sendData}
        />
        <input
          type="button"
          value="Create new game"
          className="w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          onClick={toggleShow}
        />
      </form>
    </div>
  )
}
