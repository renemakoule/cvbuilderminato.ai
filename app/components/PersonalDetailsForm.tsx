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
        placeholder='Nom complet'
        value={personalDetails.fullName}
        required
        onChange={(e) => handleChange(e, 'fullName')}
        className='input input-bordered w-full'
      />
      <div className='flex'>
        <input
          type="email"
          placeholder='Email'
          value={personalDetails.email}
          required
          onChange={(e) => handleChange(e, 'email')}
          className='input input-bordered w-full'
        />
        <input
          type="phone"
          placeholder='Numéro de téléphone'
          value={personalDetails.phone}
          required
          onChange={(e) => handleChange(e, 'phone')}
          className='input input-bordered w-full ml-4'
        />
      </div>

      <input
        type="text"
        placeholder='Addresse'
        value={personalDetails.address}
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
        placeholder='Post Recherché'
        value={personalDetails.postSeeking}
        required
        onChange={(e) => handleChange(e, 'postSeeking')}
        className='input input-bordered w-full'
      />

      <textarea
        placeholder='Description de la personne'
        value={personalDetails.description}
        required
        onChange={(e) => handleChange(e, 'description')}
        className='input input-bordered w-full h-36'
      ></textarea>


    </div>
  )
}

export default PersonalDetailsForm
