import { useDispatch, useSelector } from "react-redux";
import { removeCar } from "../store";
import { useEffect, useState } from "react";

function CarList() {
  const dispatch = useDispatch();
  // Debounce
  const { name, searchTerm, carsArray } = useSelector((state) => {
    return { name: state.form.name, ...state.cars };
  });
  const [data, setData] = useState({ filteredCars: [], totalCost: 0 });
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

    function sum() {
      return filterCars().reduce((acc, car) => acc + car.cost, 0);
    }

    const timeout = setTimeout(() => {
      setData({ filteredCars: filterCars(), totalCost: sum() });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, carsArray]);

  const renderedCars = data.filteredCars.map((car) => {
    // 決定是否 bold
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && "bold"}`}>
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
    <>
      <div className="car-list">
        {renderedCars}
        <hr />
      </div>
      {/* CarValue */}
      <div className="car-value">Total Cost: ${data.totalCost}</div>
    </>
  );
}

export default CarList;
