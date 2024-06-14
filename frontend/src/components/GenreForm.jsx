import React from 'react';

const GenreForm = ({ value, setvalue, handleSubmit, buttonText = "Submit", handleDelete }) => {
  return (
    <div className='p-3'>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input
          type="text"
          className='py-3 px-4 border rounded-lg w-[60rem]'
          placeholder='Write the genre name'
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />

        <div className='flex justify-between'>
          <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {buttonText}
          </button>

          {handleDelete && (
            <button onClick={handleDelete} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GenreForm;
