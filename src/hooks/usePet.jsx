import { useQuery } from 'react-query';

const fetchPet = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  return res.json();
  //return axios.get(`http://pets-v2.dev-apis.com/pets?id=${id}`) in case axios
};

const usePet = (petId) => {
  return useQuery(['pet', petId], fetchPet, {
    staleTime: 600000,
    cacheTime: 3600000,
    refetchOnWindowFocus: false,
  });
};

export default usePet;
