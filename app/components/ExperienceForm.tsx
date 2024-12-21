import { Experience } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    experience: Experience[];
    setExperiences: (experience: Experience[]) => void
}

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
    const [newExperience, setNewExperience] = useState<Experience>({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Experience) => {
        setNewExperience({ ...newExperience, [field]: e.target.value })
    }

    const handleAddExperience = () => {
        if (Object.values(newExperience).every(value => value.trim() !== '')) {
            setExperiences([...experience, newExperience])
            setNewExperience({
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                description: '',
            })
            toast.success('Expérience ajoutée avec succès !');
        } else {
            toast.error('Veuillez remplir tous les champs avant d\'ajouter une expérience.');
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Votre poste'
                        value={newExperience.jobTitle}
                        required
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={newExperience.companyName}
                        required
                        onChange={(e) => handleChange(e, 'companyName')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Date de début'
                        required
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newExperience.startDate}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Date de fin'
                        required
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newExperience.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>
                <textarea
                    placeholder='Description du poste'
                    value={newExperience.description}
                    required
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full h-20'
                ></textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className='btn btn-primary mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default ExperienceForm

