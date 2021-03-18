import React from 'react';

const FormModal: React.FC = ({ children }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <div className="inline-block w-full overflow-hidden transition-all transform bg-white rounded-lg shadow-xl md:w-1/2 sm:my-8 sm:align-middle" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormModal
