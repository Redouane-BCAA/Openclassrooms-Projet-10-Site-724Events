import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Changement > pour afficher dans l'ordre voulu par le client
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if(byDateDesc){
      setTimeout(
        // Ajout -1 pour gérer le bug du caroussel
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
      );
    };
  }
  useEffect(() => { 
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div>
          <div
          // changement event.title par id
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
            
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  // remplacement de idx par index pour résoudre les radiobutton
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div> 
      ))}
    </div>
  );
};

export default Slider;
