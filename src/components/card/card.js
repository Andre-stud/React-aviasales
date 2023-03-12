import './card.scss';
import logo from './S7 Logo.png';

function Card({price,  flightThere, flightBack}) {

  const flightThereOrigin = flightThere.origin;
  const flightThereDestination = flightThere.destination;
  const flightThereDuration = flightThere.duration;
  const flightThereDurationHour = Math.trunc(flightThereDuration / 60);
  const flightThereDurationMinutes = flightThereDuration - flightThereDurationHour * 60;
   

  const flightThereStops = flightThere.stops.map((element, idx) =>{
    if(idx+1 === flightThere.stops.length){
      return `${element}`;
    }
    return `${element}, `;
  } );

  // const transferThere = flightThereStops.length >= 2 ? 'пересадки' : flightThereStops.length === 1? 'пересадка' : 'пересадок' ;
  


  const flightBackOrigin = flightBack.origin;
  const flightBackDestination = flightBack.destination;
  const flightBackDuration = flightBack.duration;
  const flightBackDurationHour = Math.trunc(flightBackDuration / 60);
  const flightBackDurationMinutes = flightBackDuration - flightBackDurationHour * 60;
  

  const flightBackStops = flightBack.stops.map((element, idx) =>{
    if(idx+1 === flightBack.stops.length){
      return `${element}`;
    }
    return `${element}, `;
  } );

  // const transferBack = flightBackStops.length;

const quantityTransfer = (quantity)=>{
  if(quantity >= 2 ){
    return 'пересадки';
  }
  if(quantity === 1 ){
    return 'пересадка';
  }

    return 'пересадок';

};
  

  return (
    <div className="card">

        <div className='card-header'>
          <div className='card-header__text'>{`${price} Р`}</div>
           <img src={logo} alt='logo'/> 
        </div>
        <div className='card-discription'>
          <span className='card-discription__text'>{flightThereOrigin} – {flightThereDestination}</span>
          <span className='card-discription__text'>В пути</span>
          <span className='card-discription__text'>{flightThereStops.length} {quantityTransfer(flightThereStops.length)}</span>
        </div>
        <div className='card-data'>
          <span className='card-data__text'>10:45 – 08:00</span>
          <span className='card-data__text'>{flightThereDurationHour}ч {flightThereDurationMinutes}м</span>
          <span className='card-data__text'>{flightThereStops}</span>
        </div>

        <div className='card-discription'>
          <span className='card-discription__text'>{flightBackOrigin} – {flightBackDestination}</span>
          <span className='card-discription__text'>В пути</span>
          <span className='card-discription__text'>{flightBackStops.length} {quantityTransfer(flightBackStops.length)}</span>
        </div>
        <div className='card-data'>
          <span className='card-data__text'>11:20 – 00:50</span>
          <span className='card-data__text'>{flightBackDurationHour}ч {flightBackDurationMinutes}м</span>
          <span className='card-data__text'>{flightBackStops}</span>
        </div>

    </div>
  );
}

export default Card;
