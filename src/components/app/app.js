import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import HeaderLogo from '../header-logo';
import MenuFilter from '../menu-filter';
import CardsList from '../cards-list';
import {clickButtonFilter} from '../store/button-slice';
import {fetchTickets} from '../store/tickets-slice';


import './app.scss';

function App() {

  const activeButtonFilter = useSelector(active => active.button.button);

  // const tickets = useSelector(ticket=> ticket.tickets.tickets);
  // console.log(tickets);


  const dispatch = useDispatch();
  
  

  const onClickButton = (e) => {

    const value = e.currentTarget.name;
    dispatch(clickButtonFilter({value}));

  };

  useEffect(()=>{
    dispatch(fetchTickets());
  },[dispatch]);

  const buttonsData = [
    {classNameButton:'filter-button left-button', nameButton: 'cheapest', label: 'САМЫЙ ДЕШЕВЫЙ'},
    {classNameButton:'filter-button ', nameButton: 'fastest', label: 'САМЫЙ БЫСТРЫЙ'},
    {classNameButton:'filter-button right-button', nameButton: 'optimal', label: 'ОПТИМАЛЬНЫЙ'},
  ];

  const buttons = buttonsData.map(({classNameButton, nameButton, label})=>{

    const typeButon = activeButtonFilter === nameButton?  'primary' : 'default';

    return(
      <li key={label}>
      <Button className={classNameButton} type={typeButon} name={nameButton} onClick={onClickButton}>{label}</Button>
      </li>
    );
  });

  return (
    <>
    <HeaderLogo />
      <MenuFilter />
      <ul className='button-group'>
        {buttons}
      </ul>
      
      
      <CardsList />
      
      <Button className='footer-button' type="primary">Показать еще 5 билетов!</Button>
    </>

  );
}

export default App;
