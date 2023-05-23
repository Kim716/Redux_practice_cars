import { useDispatch, useSelector } from "react-redux";
import { removeCar } from "../store";

function CarList() {
  const dispatch = useDispatch();
  const { carsArray } = useSelector((state) => state.cars);

  const handleDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = carsArray.map((car) => {
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

  return <div>{renderedCars}</div>;
}

export default CarList;
