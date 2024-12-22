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

const CVPreviewModern: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills , hobbies , download , ref}) => {
  return (
    <div ref={ref} className={`flex flex-col p-12 w-[950px] h-[1600px] bg-white ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Header Section */}
      <header className="flex items-center gap-8 pb-8 border-b border-primary">
        {file && (
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={URL.createObjectURL(file)}
              width={160}
              height={160}
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
        <div>
          <h1 className="text-4xl font-bold mb-2">{personalDetails.fullName}</h1>
          <h2 className="text-2xl text-primary font-semibold mb-4">{personalDetails.postSeeking}</h2>
          <div className="flex gap-6 text-sm">
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
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-4 text-primary">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 text-primary">Langues</h3>
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
            <h3 className="text-lg font-bold mb-4 text-primary">Hobbies</h3>
            <ul className="space-y-2">
              {hobbies.map((hobby, index) => (
                <li key={index} className="capitalize">{hobby.name}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-4 text-primary">Profil</h3>
            <p className="text-sm leading-relaxed">{personalDetails.description}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 text-primary">Expériences</h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-6 pb-4 border-l-2 border-primary">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2" />
                  <h4 className="font-bold flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4" />
                    {exp.jobTitle}
                  </h4>
                  <p className="text-sm text-primary my-1">{exp.companyName}</p>
                  <p className="text-sm italic mb-2">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 text-primary">Formation</h3>
            <div className="space-y-4">
              {educations.map((edu, index) => (
                <div key={index} className="relative pl-6 pb-4 border-l-2 border-primary">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2" />
                  <h4 className="font-bold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-primary my-1">{edu.school}</p>
                  <p className="text-sm italic mb-2">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  <p className="text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CVPreviewModern

