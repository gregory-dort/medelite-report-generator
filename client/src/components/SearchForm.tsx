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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            />
            {errors.query && <span>{errors.query.message}</span>}
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;