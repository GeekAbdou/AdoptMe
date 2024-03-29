import { useQuery } from 'react-query';

const fetchPet = async ({ queryKey }) => {
  const [, { animal, breed, location }] = queryKey;
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  return res.json();
};

const usePetsSearch = (SearchParams) => {
  return useQuery(['Search-params', SearchParams], fetchPet, {
    staleTime: 600000,
    cacheTime: 3600000,
    refetchOnWindowFocus: false,
  });
};

export default usePetsSearch;
