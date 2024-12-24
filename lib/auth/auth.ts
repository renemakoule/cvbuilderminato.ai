'use server'

import {supabaseServerClient } from "@/lib/supabaseServer"


export const getUser = async () => {
    const supabase = await supabaseServerClient();
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (!user) {
            throw new Error("No user found");
        }

        return {
            user:{
                id: user.id,
                email: user.email
            }
        };
    } catch (error) {
        console.error('Error retrieving user:', error);
        return null;
    }
};



export async function signOutUser() {
    const supabase = await supabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error during sign out:', error.message);
        return null;
    } else {
        console.log('Successfully signed out');
        return "ok"
    }

}

export async function signOut() {
    const supabase = await supabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error during sign out:', error.message);
    } else {
        console.log('Successfully signed out');
    }
    window.location.reload();
}