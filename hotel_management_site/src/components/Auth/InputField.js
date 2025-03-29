"use client";
const InputField = ({ label, type, value, onChange }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
                required
            />
        </div>
    );
};

export default InputField;
