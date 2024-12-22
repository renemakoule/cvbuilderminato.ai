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

const CVPreviewProfessional: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills , hobbies , download , ref}) => {
  return (
    <div ref={ref} className={`w-[950px] h-[1500px] bg-white ${download ? 'mb-10' : ''}`} data-theme={theme}>
      {/* Header with Background */}
      <header className="bg-primary text-white px-12 py-8">
        <div className="flex items-center gap-8">
          {file && (
            <div className="w-36 h-36 rounded-full border-4 border-white/30 overflow-hidden flex-shrink-0">
              <Image
                src={URL.createObjectURL(file)}
                width={144}
                height={144}
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
            <h2 className="text-2xl opacity-90 mb-4">{personalDetails.postSeeking}</h2>
            <div className="flex gap-6 text-sm opacity-80">
              {personalDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {personalDetails.phone}
                </div>
              )}
              {personalDetails.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {personalDetails.email}
                </div>
              )}
              {personalDetails.address && (
                <div className="flex items-center gap-2">
                  <MapPinCheckInside className="w-4 h-4" />
                  {personalDetails.address}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-12 py-8">
        {/* Profile Summary */}
        <section className="mb-10">
          <div className="max-w-3xl">
            <p className="text-gray-600 leading-relaxed">{personalDetails.description}</p>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8">
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <BriefcaseBusiness className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Expérience Professionnelle</h3>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 pb-8 border-l-2 border-gray-200 last:pb-0">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold">{exp.jobTitle}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-primary font-medium">{exp.companyName}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Formation</h3>
              </div>
              <div className="space-y-8">
                {educations.map((edu, index) => (
                  <div key={index} className="relative pl-6 pb-8 border-l-2 border-gray-200 last:pb-0">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-8">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Langues</h3>
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
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Hobbies</h3>
              <div className="space-y-2">
                {hobbies.map((hobby, index) => (
                  <p key={index} className="capitalize text-gray-600">{hobby.name}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CVPreviewProfessional

