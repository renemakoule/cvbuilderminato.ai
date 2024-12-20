import { Education } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    educations: Education[];
    setEducations: (educations: Education[]) => void;
}

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {

    const [newEducation, setNewEducation] = useState<Education>(
        {
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Education) => {
        if (field === 'startDate' || field === 'endDate') {
            const formattedDate = formatDate(e.target.value);
            setNewEducation({ ...newEducation, [field]: formattedDate });
        } else {
            setNewEducation({ ...newEducation, [field]: e.target.value });
        }
    }

    const handleAddEducation = () => {
        if (Object.values(newEducation).every(value => value.trim() !== '')) {
            setEducations([...educations, newEducation])
            setNewEducation(
                {
                    school: '',
                    degree: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                }
            )
            toast.success('Formation ajoutée avec succès !');
        } else {
            toast.error('Veuillez remplir tous les champs avant d\'ajouter une formation.');
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder="Nom de l'école"
                        value={newEducation.school}
                        required
                        onChange={(e) => handleChange(e, 'school')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Diplôme"
                        value={newEducation.degree}
                        required
                        onChange={(e) => handleChange(e, 'degree')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <div>
                    <label className='ml-3'>Date de début</label>
                    <input
                        type="date"
                        placeholder='Date de début'
                        required
                        value={newEducation.startDate ? newEducation.startDate.split('/').reverse().join('-') : ''}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    </div>
                    <div>
                    <label htmlFor="Date de fin" className='ml-6'>Date de fin</label>
                    <input
                        type="date"
                        placeholder='Date de fin'
                        required
                        value={newEducation.endDate ? newEducation.endDate.split('/').reverse().join('-') : ''}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                    </div>
                </div>
                
                <textarea
                    placeholder='Description'
                    value={newEducation.description}
                    required
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full'
                ></textarea>
            </div>

            <button
                onClick={handleAddEducation}
                className='btn btn-outline btn-primary btn-xs h-10 mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>

        </div>
    )
}

export default EducationForm

