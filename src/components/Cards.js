import React, { PropTypes, Component } from 'react'
import moment from 'moment'

export default class Page extends Component {

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
          <div className='col s12 m6' key={index}>
            <div className='card'>
              <div className='card-content'>
                <h5 className='col s12 card-title header'>
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
      titleCards = <h5 className='component-cards-title col s12'>Find <span>{cards.length}</span> results in carrier:
                "<span>{name}</span>"
              </h5>;
    } else {
      titleCards = ''
    }

    return  <div className='cards-container'>
              {titleCards}
              {displayedCards}
            </div>
  }

}

Page.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
}
