import { useDispatch, useSelector } from "react-redux";
import { removeCar } from "../store";
import { useEffect, useState } from "react";

function CarList() {
  const dispatch = useDispatch();
  // Debounce
  const { searchTerm, carsArray } = useSelector((state) => state.cars);
  const [filteredCars, setFilteredCars] = useState([]);
  // const filteredCars = useSelector(({ cars: { searchTerm, carsArray } }) => {
  //   return carsArray.filter((car) =>
  //     car.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const handleDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  // Debounce
  useEffect(() => {
    function filterCars() {
      return carsArray.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const timeout = setTimeout(() => {
      console.log(searchTerm);
      setFilteredCars(filterCars());
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, carsArray]);

  const renderedCars = filteredCars.map((car) => {
    return (
      <div key={car.id} className="panel">
        <p>
          {car.name} - ${car.cost}
        </p>
        <button className="button is-danger" onClick={() => handleDelete(car)}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
