import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../../../../store/cartSlice';

export default function ServiceCard({service, onSelect, isSelected}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDetailClick = () => {
      navigate(`/services/${service.id}`);
    };

    const handleBooking = () => {
      if (!isSelected) {
        dispatch(addItem({
          id: service.id,
          name: service.name,
          price: service.price,
          time: service.time,
          image: service.image
        }));
      }
      onSelect(service);
    };

    return (
      <div className="w-full lg:w-1/3 p-4 group">
        <div className={`bg-white rounded-xl shadow-lg border ${
          isSelected 
            ? "border-[#A10550]" 
            : "border-gray-200 hover:border-[#A10550]"
        } p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
          <div className="relative overflow-hidden rounded-xl mb-8">
            <img
              src={service.image}
              className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              alt={service.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="text-center">
            <h5 className="text-[#A10550] font-playfair font-bold text-2xl mb-4 hover:text-[#800440] transition-colors">
              {service.name}
            </h5>
            <p className="font-bold text-xl mb-4 text-gray-800">
              ${service.price}.00 - {service.time}
            </p>
            <p className="text-gray-600 text-lg mb-8 line-clamp-3">{service.description}</p>
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300
                  ${
                    isSelected
                      ? "bg-[#A10550] text-white shadow-lg shadow-[#A10550]/30"
                      : "bg-gray-100 text-black hover:bg-[#A10550] hover:text-white hover:shadow-lg hover:shadow-[#A10550]/30"
                  }`}
                onClick={handleBooking}
              >
                {isSelected ? "Booked" : "Book Now"}
              </button>
              <button
                onClick={handleDetailClick}
                className="flex-1 py-3 px-6 rounded-lg font-bold text-lg border-2 border-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white"
              >
                Details
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
      </div>
    );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
