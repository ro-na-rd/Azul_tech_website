// Components should consume useSanityData() from SanityDataContext directly.
// This re-export exists purely for backward compatibility during migration.
export { useSanityData as useHomeData } from '../contexts/SanityDataContext';
