/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import { BriefcaseBusiness, GraduationCap, Mail, MapPinIcon as MapPinCheckInside, Phone, Star } from 'lucide-react'
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
const CVPreviewClassic: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download, ref }) => {
  return (
    <div ref={ref} className={`w-[950px] h-[1500px] bg-white border-t-8 border-primary ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Header */}
      <header className="px-12 pt-12 pb-8 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif mb-2">{personalDetails.fullName}</h1>
            <h2 className="text-2xl text-primary font-serif">{personalDetails.postSeeking}</h2>
          </div>
          {file && (
            <div className="w-32 h-32">
              <Image
                src={URL.createObjectURL(file)}
                width={128}
                height={128}
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
        </div>
        
        <div className="mt-6 flex gap-8 text-sm">
          {personalDetails.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              {personalDetails.phone}
            </div>
          )}
          {personalDetails.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              {personalDetails.email}
            </div>
          )}
          {personalDetails.address && (
            <div className="flex items-center gap-2">
              <MapPinCheckInside className="w-4 h-4 text-primary" />
              {personalDetails.address}
            </div>
          )}
        </div>
      </header>

      <div className="px-12 py-8">
        {/* Profile */}
        <section className="mb-8">
          <h3 className="text-xl font-serif border-b border-primary pb-2 mb-4">Profil</h3>
          <p className="text-gray-700 leading-relaxed">{personalDetails.description}</p>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-serif border-b border-primary pb-2 mb-6">Expériences Professionnelles</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{exp.jobTitle}</h4>
                      <span className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.companyName}</p>
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-serif border-b border-primary pb-2 mb-6">Formation</h3>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div key={index} className="pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <span className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-serif border-b border-primary pb-2 mb-4">Compétences</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <p key={index} className="py-1 px-3 bg-gray-100 rounded text-sm">
                    {skill.name}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-serif border-b border-primary pb-2 mb-4">Langues</h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <p className="font-medium mb-1 capitalize">{lang.language}</p>
                    <div className="flex">{getStarRating(lang.proficiency)}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-serif border-b border-primary pb-2 mb-4">Hobbies</h3>
              <div className="space-y-2">
                {hobbies.map((hobby, index) => (
                  <p key={index} className="text-gray-700 capitalize">{hobby.name}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVPreviewClassic

