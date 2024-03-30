import React, { useState, useContext } from 'react';
import useBreedList from '../hooks/useBreedList';
import Results from '../components/Results';
import usePetsSearch from '../hooks/usePetsSearch';
import Loader from '../components/Loader';
import AdoptedPetContext from '../context/AdoptedPetContext';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });

  const petsQuery = usePetsSearch(searchParams);
  const pets = petsQuery?.data?.pets ?? [];

  const breedsQuery = useBreedList(searchParams.animal);
  const breeds = breedsQuery?.data?.breeds ?? [];
  const [adoptedPet] = useContext(AdoptedPetContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const animal = formData.get('animal');
    const location = formData.get('location');
    const breed = formData.get('breed');
    setSearchParams({ animal, location, breed });
  };

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="Location"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={searchParams.animal}
            onChange={handleInputChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            value={searchParams.breed}
            onChange={handleInputChange}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      {petsQuery.isLoading && (
        <div className="search loader-container">
          <Loader />
        </div>
      )}
      {petsQuery.isError && <span>{petsQuery.error}</span>}
      {petsQuery.data && <Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
