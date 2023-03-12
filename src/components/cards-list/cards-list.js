
import { useSelector} from 'react-redux';

import Card from '../card';
import './cards-list.scss';

function CardsList() {

  const tickets = useSelector(state=> state.tickets.tickets.tickets);

  


  const statusTicketsSlice = useSelector(state=> state.tickets.status);




  const cards = statusTicketsSlice === 'resolved'? tickets.map((element) => {

    const {price, carrier} = element;
    const flightThere = element.segments[0];
    const flightBack = element.segments[1];

    return(
      <li key={`${price}${carrier}`}>
      <Card price={price} carrier={carrier} flightThere={flightThere}
      flightBack={flightBack}/>
      </li>
    );

    
    // console.log(element);
  }) : null;





  return (
    <ul className="cards-list">

      {cards}
      
      {/* <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card /> */}

    </ul>
  );
}

export default CardsList;
