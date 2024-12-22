import { Experience } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    experience: Experience[];
    setExperiences: (experience: Experience[]) => void
}

const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };


const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
    const [newExperience, setNewExperience] = useState<Experience>({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Experience) => {
        if (field === 'startDate' || field === 'endDate') {
            const formattedDate = formatDate(e.target.value);
            setNewExperience({ ...newExperience, [field]: formattedDate });
        } else {
            setNewExperience({ ...newExperience, [field]: e.target.value });
        }
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
            toast.success('Experience successfully added !');
        } else {
            toast.error('Please fill in all fields before adding an experience.');
        }
    }

    return (
        <div className='poppins-regular'>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Your Position job'
                        value={newExperience.jobTitle}
                        required
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={newExperience.companyName}
                        required
                        onChange={(e) => handleChange(e, 'companyName')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <div>
                    <label className='ml-3'>Start date</label>
                    <input
                        type="date"
                        placeholder='Start date'
                        required
                        value={newExperience.startDate ? newExperience.startDate.split('/').reverse().join('-') : ''}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    </div>
                    <div>
                    <label htmlFor="Date de fin" className='ml-6'>End date</label>
                    <input
                        type="date"
                        placeholder='End date'
                        required
                        value={newExperience.endDate ? newExperience.endDate.split('/').reverse().join('-') : ''}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                    </div>
                </div>
                <textarea
                    placeholder='Job Description'
                    value={newExperience.description}
                    required
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full h-20'
                ></textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className='btn btn-outline btn-success btn-xs h-10 mt-4'
            >
                Add
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default ExperienceForm

