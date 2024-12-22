import { Skill } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {

  const [newSkill, setNewSkill] = useState<Skill>(
    {
      name: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Skill) => {
    setNewSkill({ ...newSkill, [field]: e.target.value })
  }

  const handleAddSkill = () => {
    if (newSkill.name.trim() !== '') {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: '' });
      toast.success('Skill added successfully !');
    } else {
      toast.error('Please enter a skill before adding.');
    }
  }

  return (
    <div className='poppins-regular'>
      <div className='mt-4'>
        <input
          type="text"
          placeholder="Skill"
          value={newSkill.name}
          required
          onChange={(e) => handleChange(e, 'name')}
          className='input input-bordered w-full'
        />
      </div>

      <button
        onClick={handleAddSkill}
        className='btn btn-outline btn-primary btn-xs h-10 mt-4'
      >
        Add
        <Plus className='w-4' />
      </button>
    </div>
  )
}

export default SkillForm

