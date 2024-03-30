import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Loader from '../components/Loader';
import usePet from '../hooks/usePet';
import Carousel from '../components/carousel';
import Modal from '../components/Modall';
import AdoptedPetContext from '../context/AdoptedPetContext';

const Details = () => {
  const { id } = useParams();
  const petQuery = usePet(id);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const pet = petQuery.data?.pets[0];

  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <span>{petQuery.error.message}</span>}
      {pet && (
        <div>
          <h1>{pet.name}</h1>

          <Carousel images={pet.images} />

          <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>

          {/* Use a function reference in onClick to avoid immediate execution */}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>

          <p>{pet.description}</p>

          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
        </div>
      )}

      {showModal && (
        <Modal>
          <div>
            <h1>Would you like to adopt {pet.name}?</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate('/');
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Details;
