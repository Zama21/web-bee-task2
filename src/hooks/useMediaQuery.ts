import { useEffect, useState } from 'react';

type MediaQuery = {
    query: string;
};

function initialStateMatches({ query }: MediaQuery) {
    if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches;
    }
    return false;
}

export const useMediaQuery = ({ query }: MediaQuery): boolean => {
    const [matches, setMatches] = useState(() =>
        initialStateMatches({ query })
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

        mediaQuery.addEventListener('change', updateMatches);

        return () => {
            mediaQuery.removeEventListener('change', updateMatches);
        };
    }, [query]);

    return matches;
};
