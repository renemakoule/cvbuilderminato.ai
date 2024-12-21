import { Hobby } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
  hobbies: Hobby[];
  setHobbies: (hobbies: Hobby[]) => void;
};

const HobbyForm: React.FC<Props> = ({ hobbies, setHobbies }) => {
  const [newHobby, setNewHobby] = useState<Hobby>(
    {
      name: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Hobby) => {
    setNewHobby({ ...newHobby, [field]: e.target.value })
  }

  const handleAddHobby = () => {
    if (newHobby.name.trim() !== '') {
      setHobbies([...hobbies, newHobby]);
      setNewHobby({ name: '' });
      toast.success('Hobby ajouté avec succès !');
    } else {
      toast.error('Veuillez entrer un hobby avant d\'ajouter.');
    }
  }

  return (
    <div>
      <input 
        type="text"
        placeholder="Hobby"
        value={newHobby.name}
        required
        onChange={(e) => handleChange(e, 'name')}
        className='input input-bordered w-full mt-4'
      />
      <button
        onClick={handleAddHobby}
        className='btn btn-outline btn-primary btn-xs h-10 mt-4'
      >
        Ajouter
        <Plus className='w-4' />
      </button>
    </div>
  )
}

export default HobbyForm

