import './card.scss';
import { format, add } from 'date-fns';

function Card({ price, flightThere, flightBack, carrier }) {
  const flightStop = (value) =>
    value.map((element, idx) => {
      if (idx + 1 === value.length) {
        return `${element}`;
      }
      return `${element}, `;
    });

  const arrivalTime = (value, time) =>
    format(
      add(new Date(value), {
        minutes: time,
      }),
      'HH:mm'
    );

  const flightThereOrigin = flightThere.origin;
  const flightThereDestination = flightThere.destination;
  const flightThereDuration = flightThere.duration;
  const flightThereDurationHour = Math.trunc(flightThereDuration / 60);
  const flightThereDurationMinutes = flightThereDuration - flightThereDurationHour * 60;

  const departureTimeThere = format(new Date(flightThere.date), 'HH:mm');
  const arrivalTimeThere = arrivalTime(flightThere.date, flightThereDuration);
  const flightThereStops = flightStop(flightThere.stops);

  const flightBackOrigin = flightBack.origin;
  const flightBackDestination = flightBack.destination;
  const flightBackDuration = flightBack.duration;
  const flightBackDurationHour = Math.trunc(flightBackDuration / 60);
  const flightBackDurationMinutes = flightBackDuration - flightBackDurationHour * 60;

  const departureTimeBack = format(new Date(flightBack.date), 'HH:mm');
  const arrivalTimeBack = arrivalTime(flightBack.date, flightBackDuration);
  const flightBackStops = flightStop(flightBack.stops);

  const quantityTransfer = (quantity) => {
    if (quantity >= 2) {
      return 'пересадки';
    }
    if (quantity === 1) {
      return 'пересадка';
    }
    return 'пересадок';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header__text">{`${price} Р`}</div>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>
      <div className="card-discription">
        <span className="card-discription__text">
          {flightThereOrigin} – {flightThereDestination}
        </span>
        <span className="card-discription__text">В пути</span>
        <span className="card-discription__text">
          {flightThereStops.length}
          {quantityTransfer(flightThereStops.length)}
        </span>
      </div>
      <div className="card-data">
        <span className="card-data__text">
          {departureTimeThere} – {arrivalTimeThere}
        </span>
        <span className="card-data__text">
          {flightThereDurationHour}ч {flightThereDurationMinutes}м
        </span>
        <span className="card-data__text">{flightThereStops}</span>
      </div>

      <div className="card-discription">
        <span className="card-discription__text">
          {flightBackOrigin} – {flightBackDestination}
        </span>
        <span className="card-discription__text">В пути</span>
        <span className="card-discription__text">
          {flightBackStops.length} {quantityTransfer(flightBackStops.length)}
        </span>
      </div>
      <div className="card-data">
        <span className="card-data__text">
          {departureTimeBack} – {arrivalTimeBack}
        </span>
        <span className="card-data__text">
          {flightBackDurationHour}ч {flightBackDurationMinutes}м
        </span>
        <span className="card-data__text">{flightBackStops}</span>
      </div>
    </div>
  );
}

export default Card;
