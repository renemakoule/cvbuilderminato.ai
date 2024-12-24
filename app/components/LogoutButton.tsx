import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const LogoutButton = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Erreur lors de la déconnexion :', error);
        } else {
            router.push('/'); // Redirige vers la page d'accueil ou une autre page après déconnexion
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;
