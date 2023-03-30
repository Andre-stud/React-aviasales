import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import HeaderLogo from '../header-logo';
import MenuFilter from '../menu-filter';
import CardsList from '../cards-list';
import { clickButtonFilter } from '../../store/button-sort-slice';
import { fetchTickets } from '../../store/tickets-slice';

import './app.scss';

function App() {
  const [count, setCount] = useState(5);

  const activeButtonFilter = useSelector((active) => active.button.button);
  const ticketsData = useSelector((state) => state.tickets.ticketsData);

  const dispatch = useDispatch();

  const onClickButton = (e) => {
    const value = e.currentTarget.name;
    dispatch(clickButtonFilter({ value }));
  };

  const onClickButtonNext = () => {
    setCount((value) => value + 5);
  };

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const buttonsData = [
    { classNameButton: 'filter-button left-button', nameButton: 'cheapest', label: 'САМЫЙ ДЕШЕВЫЙ' },
    { classNameButton: 'filter-button ', nameButton: 'fastest', label: 'САМЫЙ БЫСТРЫЙ' },
    { classNameButton: 'filter-button right-button', nameButton: 'optimal', label: 'ОПТИМАЛЬНЫЙ' },
  ];

  const buttons = buttonsData.map(({ classNameButton, nameButton, label }) => {
    const typeButon = activeButtonFilter === nameButton ? 'primary' : 'default';

    return (
      <li key={label}>
        <Button className={classNameButton} type={typeButon} name={nameButton} onClick={onClickButton}>
          {label}
        </Button>
      </li>
    );
  });

  const showMoreButton =
    ticketsData.length !== 0 ? (
      <Button className="footer-button" onClick={onClickButtonNext} type="primary">
        Показать еще 5 билетов!{' '}
      </Button>
    ) : null;

  return (
    <>
      <HeaderLogo />
      <MenuFilter />
      <ul className="button-group">{buttons}</ul>
      <CardsList count={count} />
      {showMoreButton}
    </>
  );
}

export default App;
