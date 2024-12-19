import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';

export const personalDetailsPreset: PersonalDetails = {
    fullName: 'Rene Boris Makoule',
    email: 'renemakoule@gmail.com',
    phone: '+237651727932',
    address: 'Douala, Cameroon, Pk10',
    photoUrl: '/poket.jpg',
    postSeeking:'System Administrator',
    description:'Dynamique – Engagé – Polyvalent – Travailleur –Ouvert d’esprit – Sociable – Multiculturel – Esprit d’équipe – Bonne moralité – Gestion optimal du temps –Facilité d’adaptation et d’apprentissage'
    
};

export const experiencesPreset: Experience[] = [
    {
        id: 'uuid-1',
        jobTitle: 'computer engineer in ai',
        companyName: 'Minato.ai',
        startDate: '2024-07-01',
        endDate: 'actuel',
        description: 'Développement d\'applications web ai en utilisant React et Node.js.'
    },
    {
        id: 'uuid-2',
        jobTitle: 'Chef de projet',
        companyName: 'Minato.ai',
        startDate: '2024-07-01',
        endDate: 'actuel',
        description: 'Gestion de projets techniques, coordination des équipes de développement.'
    }
];

export const educationsPreset: Education[] = [
    {
        id: 'uuid-3',
        degree: 'Licence Technologique en Informatique',
        school: 'Institut Universitaire de Technologie de Douala (IUT)',
        startDate: '2023-10-20',
        endDate: '2024-07-19',
        description: 'Spécialisation en Administration Systeme et Reseau; développement web et bases de données.'
    },
    {
        id: 'uuid-4',
        degree: 'DUT en Informatique',
        school: 'Institut Universitaire de Technologie de Douala (IUT)',
        startDate: '2021-10-01',
        endDate: '2023-06-01',
        description: 'Spécialisation en Genie Informatique.'
    },
    {
        id: 'uuid-5',
        degree: 'BACC',
        school: 'Lycee Classique d\'Edea',
        startDate: '2020-09-01',
        endDate: '2021-06-01',
        description: 'Spécialisation en Technologie de l\'information (TI).'
    }
];

export const skillsPreset: Skill[] = [
    { id: 'uuid-6', name: 'Administration Cloud' },
    { id: 'uuid-7', name: 'VMWare' },
    { id: 'uuid-8', name: 'Python' },
    { id: 'uuid-9', name: 'React.js' },
    { id: 'uuid-10', name: 'Node.js' }
];

export const languagesPreset: Language[] = [
    { id: 'uuid-11', language: 'Anglais', proficiency: 'Débutant' },
    { id: 'uuid-12', language: 'Français', proficiency: 'Avancé' }
];

export const hobbiesPreset: Hobby[] = [
    { id: 'uuid-13', name: 'Jeux Video' },
    { id: 'uuid-14', name: 'Sport' }
];
