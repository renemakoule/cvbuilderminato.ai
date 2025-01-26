/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import { Mail, MapPinIcon as MapPinCheckInside, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
    personalDetails: PersonalDetails;
    file: File | null;
    theme: string;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    download?: boolean ;
    ref?:any
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

const getStarRating = (proficiency: string) => {
    const maxStars = 5;
    let filledStars = 0;

    switch (proficiency) {
        case 'Débutant':
            filledStars = 1;
            break;
        case 'Intermédiaire':
            filledStars = 3;
            break;
        case 'Avancé':
            filledStars = 5;
            break;
        default:
            filledStars = 0;

    }
    return (
        <>
            {Array.from({ length: filledStars }, (_, index) => (
                <Star key={index} className={`text-primary `} />
            ))}
            {Array.from({ length: maxStars - filledStars }, (_, index) => (
                <Star key={index + filledStars} className="text-gray-300" />
            ))}
        </>
    );



}


const CVPreviewMinimal: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download, ref }) => {
  return (
    <div ref={ref} className={`p-16 w-[950px] h-[1600px] bg-white ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light tracking-wide mb-2">{personalDetails.fullName}</h1>
        <h2 className="text-xl text-primary mb-6">{personalDetails.postSeeking}</h2>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          {personalDetails.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalDetails.phone}
            </span>
          )}
          {personalDetails.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalDetails.email}
            </span>
          )}
          {personalDetails.address && (
            <span className="flex items-center gap-1">
              <MapPinCheckInside className="w-4 h-4" />
              {personalDetails.address}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-4 gap-12">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {file && (
            <div className="aspect-square overflow-hidden rounded-lg mb-6">
              <Image
                src={URL.createObjectURL(file)}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                alt="Profile"
                onLoadingComplete={() => {
                  if (typeof file !== 'string') {
                    URL.revokeObjectURL(URL.createObjectURL(file))
                  }
                }}
              />
            </div>
          )}

          <section>
            <h3 className="text-sm tracking-widest uppercase mb-3">Compétences</h3>
            <div className="space-y-1">
              {skills.map((skill, index) => (
                <p key={index} className="text-sm">{skill.name}</p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm tracking-widest uppercase mb-3">Langues</h3>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index}>
                  <p className="text-sm capitalize">{lang.language}</p>
                  <div className="flex">{getStarRating(lang.proficiency)}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm tracking-widest uppercase mb-3">Hobbies</h3>
            <div className="space-y-1">
              {hobbies.map((hobby, index) => (
                <p key={index} className="text-sm capitalize">{hobby.name}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-8">
          <section>
            <p className="text-sm leading-relaxed">{personalDetails.description}</p>
          </section>

          <section>
            <h3 className="text-sm tracking-widest uppercase mb-6">Expériences</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                  <div>
                    <h4 className="font-medium">{exp.jobTitle}</h4>
                    <p className="text-primary text-sm mb-2">{exp.companyName}</p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm tracking-widest uppercase mb-6">Formation</h3>
            <div className="space-y-6">
              {educations.map((edu, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-primary text-sm mb-2">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CVPreviewMinimal

