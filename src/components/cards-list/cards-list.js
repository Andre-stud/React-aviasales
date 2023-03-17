import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useEffect } from 'react';

import { updateDataTickets } from '../store/tickets-slice';
import Card from '../card';

import './cards-list.scss';

function CardsList({ count }) {
  const dispatch = useDispatch();

  let ticketsData = useSelector((state) => state.tickets.ticketsData);
  const tickets = useSelector((state) => state.tickets.tickets);
  const statusTicketsSlice = useSelector((state) => state.tickets.status);
  const checkboxData = useSelector((active) => active.checkbox.checkbox);
  const activeButtonFilter = useSelector((active) => active.button.button);

  useEffect(() => {
    const activeCheckbox = checkboxData.filter((el) => el.isActive === true);

    const array = [];

    if (checkboxData[0].isActive === true) {
      dispatch(updateDataTickets(tickets));
    }

    if (checkboxData[0].isActive !== true) {
      tickets.forEach((element) => {
        activeCheckbox.forEach((el) => {
          if (
            el.value !== 'all' &&
            element.segments[0].stops.length === el.value &&
            element.segments[1].stops.length === el.value
          ) {
            array.push(element);
          }
        });
      });
      dispatch(updateDataTickets(array));
    }
  }, [checkboxData, dispatch, tickets]);

  const activeCheckboxData = checkboxData.filter((el) => el.isActive === true);

  const spiner =
    activeCheckboxData.length !== 0 && statusTicketsSlice !== 'resolved' ? (
      <Spin className="spiner" tip="Loading" size="large" />
    ) : null;

  const notFoundText =
    ticketsData.length === 0 && !spiner ? (
      <p className="not-found-text">&quot;Рейсов, подходящих под заданные фильтры, не найдено&quot;</p>
    ) : null;

  if (statusTicketsSlice === 'resolved' && activeButtonFilter === 'cheapest') {
    ticketsData = [...ticketsData].sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  if (statusTicketsSlice === 'resolved' && activeButtonFilter === 'fastest') {
    ticketsData = [...ticketsData].sort((a, b) => {
      a = a.segments[0].duration + a.segments[1].duration;
      b = b.segments[0].duration + b.segments[1].duration;
      return a > b ? 1 : -1;
    });
  }

  const cards =
    statusTicketsSlice === 'resolved' && !notFoundText
      ? ticketsData.slice(0, count).map((element, id) => {
          const { price, carrier } = element;
          const flightThere = element.segments[0];
          const flightBack = element.segments[1];

          return (
            <li key={`${count + id} ${carrier}`}>
              <Card price={price} carrier={carrier} flightThere={flightThere} flightBack={flightBack} />
            </li>
          );
        })
      : null;

  return (
    <ul className="cards-list">
      {cards}
      {notFoundText}
      {spiner}
    </ul>
  );
}

export default CardsList;
