"use client";
const FormContainer = ({ title, children }) => {
    return (
        <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-6">{title}</h2>
            {children}
        </div>
    );
};

export default FormContainer;
