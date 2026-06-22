import React from 'react';
import { useForm } from 'react-hook-form';

interface SearchFormProps {
    onSearchSubmit: (ccn: string) => void;
}

interface SearchFormData {
    query: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
        defaultValues: { query: '' }
    });

    const onSubmit = (data: SearchFormData) => {
        onSearchSubmit(data.query);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter CCN here (e.g., 135708)"
                    {...register('query', {
                        required: 'CCn is required',
                        pattern: {
                            value: /^\d{6}$/,
                            message: 'CCN must be a 6-digit number'
                        }
                    })}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                >Search</button>
            </div>
            {errors.query && (
                <span className="text-red-500 text-sm">{errors.query.message}</span>
            )}
        </form>
    );
}

export default SearchForm;