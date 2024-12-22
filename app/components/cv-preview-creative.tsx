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

const CVPreviewCreative: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download, ref }) => {
  return (
    <div ref={ref} className={`w-[950px] h-[1500px] bg-gradient-to-br from-primary/5 to-primary/10 ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Left Sidebar */}
      <div className="w-[300px] h-full bg-primary text-white p-8 fixed">
        {file && (
          <div className="w-48 h-48 mx-auto mb-8 rounded-2xl overflow-hidden border-4 border-white/20">
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

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Contact</h3>
            <div className="space-y-3">
              {personalDetails.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.address && (
                <div className="flex items-center gap-3">
                  <MapPinCheckInside className="w-5 h-5" />
                  <span className="text-sm">{personalDetails.address}</span>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Langues</h3>
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
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Hobbies</h3>
            <div className="space-y-2">
              {hobbies.map((hobby, index) => (
                <p key={index} className="text-sm capitalize">{hobby.name}</p>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[300px] p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-3">{personalDetails.fullName}</h1>
          <h2 className="text-2xl text-primary mb-6">{personalDetails.postSeeking}</h2>
          <p className="text-gray-600 leading-relaxed">{personalDetails.description}</p>
        </header>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-primary">Expériences</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-primary" />
                  {exp.jobTitle}
                </h4>
                <p className="text-primary my-1">{exp.companyName}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-primary">Formation</h3>
          <div className="space-y-8">
            {educations.map((edu, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  {edu.degree}
                </h4>
                <p className="text-primary my-1">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CVPreviewCreative

