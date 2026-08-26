// Hero data is now fetched centrally in SanityDataContext.
// This hook reads from context so no extra network request is made.
import { useSanityData } from '../contexts/SanityDataContext';

export function useHero() {
  const { hero, loading, error } = useSanityData();
  return { data: hero, loading, error };
}
