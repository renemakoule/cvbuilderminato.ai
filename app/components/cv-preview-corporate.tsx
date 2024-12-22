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

const CVPreviewCorporate: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download, ref }) => {
  return (
    <div ref={ref} className={`w-[950px] h-[1600px] bg-gray-50 ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Side Banner */}
      <div className="fixed left-0 top-0 bottom-0 w-1/3 bg-primary" />

      {/* Content */}
      <div className="relative grid grid-cols-3">
        {/* Left Column */}
        <div className="text-white p-8 space-y-6 h-full w-full">
          {file && (
            <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden border-4 border-white/20">
              <Image
                src={URL.createObjectURL(file)}
                width={192}
                height={192}
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

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Contact</h3>
            <div className="space-y-4">
              {personalDetails.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.address && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <MapPinCheckInside className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{personalDetails.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className='bg-info rounded-md p-2'>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 ml-5">Skill</h3>
            <div className="flex flex-wrap gap-2 ml-5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-lg text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className='bg-info rounded-md p-2'>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 ml-5">Languages</h3>
            <div className="space-y-4 ml-5">
              {languages.map((lang, index) => (
                <div key={index}>
                  <p className="font-medium mb-2 capitalize">{lang.language}</p>
                  <div className="flex">{getStarRating(lang.proficiency)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className='bg-info rounded-md p-2'>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2 ml-5">Interests</h3>
            <div className="space-y-2 ml-5 ">
              {hobbies.map((hobby, index) => (
                <p key={index} className="capitalize px-3 py-2 bg-white/10 rounded-lg text-sm">
                  {hobby.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2 p-12 bg-white">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">{personalDetails.fullName}</h1>
            <h2 className="text-2xl text-primary font-semibold mb-6">{personalDetails.postSeeking}</h2>
            <p className="text-gray-600 leading-relaxed">{personalDetails.description}</p>
          </header>

          {/* Experience */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BriefcaseBusiness className="w-6 h-6 text-primary" />
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-[14px] w-3 h-3 rounded-full border-2 border-primary bg-white" />
                  <div className="pb-8 border-l-2 border-gray-200 pl-8 -ml-[5px]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{exp.jobTitle}</h4>
                        <p className="text-primary">{exp.companyName}</p>
                      </div>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Formation
            </h3>
            <div className="space-y-4">
              {educations.map((edu, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-[14px] w-3 h-3 rounded-full border-2 border-primary bg-white" />
                  <div className="pb-8 border-l-2 border-gray-200 pl-8 -ml-[5px] last:border-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-primary">{edu.school}</p>
                      </div>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600">{edu.description}</p>
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

export default CVPreviewCorporate

