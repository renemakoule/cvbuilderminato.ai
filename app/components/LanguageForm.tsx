import { Language } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    languages: Language[];
    setLanguages: (languages: Language[]) => void;
}

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {

    const [newLanguage, setNewLanguage] = useState<Language>(
        {
            language: '',
            proficiency: ''
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Language) => {
        setNewLanguage({ ...newLanguage, [field]: e.target.value })
    }

    const handleAddLanguage = () => {
        if (newLanguage.language.trim() !== '' && newLanguage.proficiency !== '') {
            setLanguages([...languages, newLanguage])
            setNewLanguage(
                {
                    language: '',
                    proficiency: ''
                }
            )
            toast.success('Language added successfully !');
        } else {
            toast.error('Please fill in all fields before adding a language.');
        }
    }

    return (
        <div className='space-y-4 poppins-regular'>
            <input
                type="text"
                placeholder="Language"
                value={newLanguage.language}
                required
                onChange={(e) => handleChange(e, 'language')}
                className='input input-bordered w-full'
            />
            <select
                value={newLanguage.proficiency}
                required
                onChange={(e) => handleChange(e, 'proficiency')}
                className='select select-bordered w-full'
            >
                <option value="">Select Mastery</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
            </select>

            <button
                onClick={handleAddLanguage}
                className='btn btn-outline btn-primary btn-xs h-10 mt-4'
            >
                Add
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default LanguageForm

