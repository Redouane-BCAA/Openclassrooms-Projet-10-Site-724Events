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
    // ajout de la condition si tableau byDateDesc existe et et sup à 0 alors lancement du setTimeout
    if(byDateDesc && byDateDesc.length > 0){
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
        // déplacement de la key dans une autre div qui englobe le composant slidecard
        <div key={event.title}>
          <div
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
              {/* remplacement undersocre par bullet (ici represenete chaque élément du tableau) comme variable pour utilisation dans key */}
              {byDateDesc.map((bullet, radioIdx) => (
                <input
                  key={`${bullet.title}`}
                  type="radio"
                  name="radio-button"
                  // remplacement de idx par index pour résoudre les radiobutton
                  checked={index === radioIdx}
                  // ajout readOnly suite à l'erreur de console erreur console 
                  readOnly
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
