import { PersonalDetails } from '@/type';
import React from 'react'

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
}

const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, setFile }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof PersonalDetails) => {
    setPersonalDetails({ ...personalDetails, [fied]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className='flex flex-col gap-4 poppins-regular'>
      <input
        type="text"
        placeholder='Rene Boris Makoule'
        required
        onChange={(e) => handleChange(e, 'fullName')}
        className='input input-bordered w-full'
      />
      <div className='flex'>
        <input
          type="email"
          placeholder='renemakoule@gmail.com'
          required
          onChange={(e) => handleChange(e, 'email')}
          className='input input-bordered w-full'
        />
        <input
          type="number"
          placeholder='+237 651727932'
          required
          onChange={(e) => handleChange(e, 'phone')}
          className='input input-bordered w-full ml-4'
        />
      </div>

      <input
        type="text"
        placeholder='Douala, Cameroon, Pk10'
        required
        onChange={(e) => handleChange(e, 'address')}
        className='input input-bordered w-full'
      />

      <input
        type="file"
        accept='image/*'
        onChange={handleFileChange}
        required
        className='file-input file-input-bordered w-full file-input-primary'
      />

      <input
        type="text"
        placeholder='System Administrator'
        required
        onChange={(e) => handleChange(e, 'postSeeking')}
        className='input input-bordered w-full'
      />

      <textarea
        placeholder='Dynamic – Committed – Versatile – Hardworking – Open-minded – Sociable – Multicultural – Team spirit – Good morality – Optimal time management – ​​Ease of adaptation and learning'
        required
        onChange={(e) => handleChange(e, 'description')}
        className='input input-bordered w-full h-36'
      ></textarea>


    </div>
  )
}

export default PersonalDetailsForm
