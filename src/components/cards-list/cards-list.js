import { useSelector } from 'react-redux';

import Card from '../card';
import './cards-list.scss';

function CardsList({ count }) {
  const tickets = useSelector((state) => state.tickets.tickets);

  const statusTicketsSlice = useSelector((state) => state.tickets.status);
  const activeCheckbox = useSelector((active) => active.checkbox.checkbox);
  const statusCheckbox =
    activeCheckbox[1].isActive &&
    activeCheckbox[2].isActive &&
    activeCheckbox[3].isActive &&
    activeCheckbox[4].isActive;

  const notFoundText = !statusCheckbox ? (
    <span>&quot;Рейсов, подходящих под заданные фильтры, не найдено&quot;</span>
  ) : null;

  const cards =
    statusTicketsSlice === 'resolved' && !notFoundText
      ? tickets.slice(0, count).map((element) => {
          const { price, carrier } = element;
          const flightThere = element.segments[0];
          const flightBack = element.segments[1];

          return (
            <li key={`${price}${carrier}`}>
              <Card price={price} carrier={carrier} flightThere={flightThere} flightBack={flightBack} />
            </li>
          );
        })
      : null;

  return (
    <ul className="cards-list">
      {cards}
      <h2>{notFoundText}</h2>
    </ul>
  );
}

export default CardsList;
