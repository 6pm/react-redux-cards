import React, { PropTypes, Component } from 'react'
import moment from 'moment' // for manipulation with dates

const ANIMATION_DELAY = 500

export default class Cards extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }

  componentWillUpdate() {
      // remove class for animate cards
      this.refs.CardsContainer.classList.remove('show')
  }

  componentDidUpdate() {
    // add class for animate cards
    setTimeout(()=>{
      this.refs.CardsContainer.classList.add('show')
    }, ANIMATION_DELAY)
  }

  /**
   * format date
   *
   * @param date(String) - unformatted date
   * @return (String) - date in format 'Do MMMM YYYY [at] h:mm a'
   */
  formatDate(date) {
    return moment(date).format('Do MMMM YYYY [at] h:mm a')
  }

  render() {
    const { name, cards } = this.props

    let displayedCards =  cards.map((item, index) => {

      return (
          <div className='col s12 m6 card-item'
               style={{transitionDelay: `0.${index}s`}}
               key={index}
          >
            <div className='card'>
              <div className='card-content'>
                <h5 className='card-title header'>
                  <span>{item.direction.from}</span> - <span>{item.direction.to}</span>
                </h5>

                <p className='carrier-line'>
                  <span className='bolder miw90'>Carrier: </span>
                  <span>{item.carrier}</span>
                </p>
                <p className='carrier-line'>
                  <span className='bolder miw90'>Departure: </span>
                  <span>{this.formatDate(item.departure)}</span>
                </p>
                <p className='carrier-line'>
                  <span className='bolder miw90'>Arrival: </span>
                  <span>{this.formatDate(item.arrival)}</span>
                </p>

              </div>
              <div className='card-action'>
                <a className='waves-effect waves-light btn' href='#'>
                  Buy ticket
                  <i className='material-icons right'>flight</i>
                </a>
              </div>
            </div>

          </div>
      )
    });

    let titleCards;
    if (name.length > 0) {
      titleCards =  <h5 className='component-cards-title col s12'>Find <span>{cards.length}</span> results in carrier:
                      "<span>{name}</span>"
                    </h5>;
    } else {
      titleCards = ''
    }

    return  <div className='cards-container' ref='CardsContainer'>
              {titleCards}
              {displayedCards}
            </div>
  }

}
