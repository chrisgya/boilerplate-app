import React from 'react';
import Image from 'next/image';

const FormLayout: React.FC<{ hideLogo?: boolean }> = ({ children, hideLogo }) => {
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-8 pb-24 mx-auto pt-30 lg:px-4">
                {!hideLogo && <div className="w-20 p-6 mx-auto"><Image width={200} height={200} layout="responsive" src="/images/logo.png" alt="Chrisgya Company" /></div>}
                {children}

            </div>
        </section>
    )
}

export default FormLayout
