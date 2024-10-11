import React from 'react'

const Model = ({isOpen,onClose,children}) => {
  return (
    <div>
        {isOpen &&(
            <div className='fixed inset-0 flex-center justify-center z-50'>
                <div className='fixed inset-0 bg-black opacity-59'>
                    <div className="absolute top-[40%] left-[20%] bg-white p-4 rounded-lg z-10 text-right ">
                        <button className='text-black font-semibold hover:text-grey-700 focus:outline-none mr-2 ' onClick={onClose}>
                            X


                        </button>
                        {children}
                    </div>
                </div>
            </div>
        )}
      
    </div>
  )
}

export default Model
