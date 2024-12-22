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

const CVPreviewExecutive: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download, ref }) => {
  return (
    <div ref={ref} className={`w-[950px] h-[1600px] bg-white ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Top Banner */}
      <div className="h-24 bg-primary" />

      {/* Main Content with Negative Margin */}
      <div className="px-12 -mt-12">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex gap-8 items-start">
            {file && (
              <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
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
            <div className="flex-grow">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{personalDetails.fullName}</h1>
              <h2 className="text-2xl text-primary font-semibold mb-4">{personalDetails.postSeeking}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {personalDetails.phone && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    {personalDetails.phone}
                  </div>
                )}
                {personalDetails.email && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    {personalDetails.email}
                  </div>
                )}
                {personalDetails.address && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPinCheckInside className="w-4 h-4 text-primary" />
                    </div>
                    {personalDetails.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">Professional Profile</h3>
          <p className="text-gray-600 leading-relaxed">{personalDetails.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BriefcaseBusiness className="w-6 h-6 text-primary" />
                Professional Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-6 last:pb-0">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-medium">{exp.jobTitle}</h4>
                        <p className="text-primary">{exp.companyName}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Formation
              </h3>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-6 last:pb-0">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-medium">{edu.degree}</h4>
                        <p className="text-primary">{edu.school}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Skill</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Language</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium capitalize">{lang.language}</p>
                    </div>
                    <div className="flex">{getStarRating(lang.proficiency)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Interests</h3>
              <div className="space-y-2">
                {hobbies.map((hobby, index) => (
                  <p key={index} className="capitalize py-2 px-4 bg-gray-50 rounded-lg">
                    {hobby.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVPreviewExecutive

