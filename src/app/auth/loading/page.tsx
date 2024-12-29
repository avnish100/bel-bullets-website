'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLoading() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/leaderboard');
        }, 1000); // Small delay to ensure session propagation
    }, [router]);

    return <p>Authenticating... Please wait.</p>;
}
