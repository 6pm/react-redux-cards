import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// components
import Select, { Option } from 'rc-select';
import Cards from '../components/Cards'

// actions
import * as CarriersActions from '../actions/CarriersActions'

// styles
import 'materialize-css/dist/css/materialize.min.css'
import 'rc-select/assets/index.css'

// path to data from json file
const DATA_PATH = '/data/data.json'

class App extends Component {

  componentWillMount() {
    // get actions for work with carriers
    const { loadCarriersData } = this.props.CarriersActions

    this.promisifyLoadJSON(DATA_PATH)
        .then(
            data => {
              // set data into store
              loadCarriersData(data.flights)

              return data
            },

            error => {
              console.dir('Rejected: ', error);
            }
        );
  }

  /**
   * get carriers names from cards object. Collect unique names
   *
   * @param data(Object) - all cards
   * @param name(String) - selected carrier in select
   *
   * @return (Array) - selected cards. If 'name' = 'all' - returns all cards
   */
  filterByCarrierName(data, name) {
    // get all cards
    if(name === 'all') return data

    // filter by name
    let result = []

    for(let key in data) {
      if(data[key].carrier === name) {
        result.push(data[key])
      }
    }

    return result
  }

  /**
   * create options for select with carriers
   *
   * @param flightsData(Object) - data with all flights
   * @return - JSX components Option for custom select plugin
   */
  createSelectOptions(flightsData) {
    let carriers = {
      all: 'all' // this is default item for showing all items
    }

    // collect unique carriers
    for(let key in flightsData) {
      let name = flightsData[key].carrier
      carriers[name] = name
    }

    // convert to array
    let unique =  Object.keys(carriers).map(key => carriers[key])

    return  unique.map((item, index) => {
      return (
          <Option value={item} key={index}>{item}</Option>
      )
    });
  }

  /**
   * load data JSON data from file.
   * Returns fulfilled promise or object with Error
   *
   * @param url(String) - path to file
   * @return(Object)
   */
  promisifyLoadJSON(url) {
    return new Promise((resolve, reject) => {
      // create AJAX request
      let request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // parse json
          try {
            // if data without error - resolve promice
            resolve(JSON.parse(request.responseText))

          } catch (e) {
            reject(new Error('Error on parse JSON'))
          }

        } else {
          reject(new Error('Load server - done, but server return error'))
        }
      };

      request.onerror = function() {
        reject(new Error('connection error'))
      };

      request.send();
    });
  }

  /**
   * Change select. Call action and change state
   *
   * @param e(Object) - event object
   * */
  onChange(e) {
    let value = (e && e.target) ? e.target.value : e

    // import action
    const { changeCarrier } = this.props.CarriersActions
    changeCarrier(value)
  }


  render() {
    const { carriers } = this.props
    // options for select
    let options = this.createSelectOptions(carriers.allCards)
    // filtered cards
    let filtered = this.filterByCarrierName(carriers.allCards, carriers.showedCarrier)

    return <div className='container'>
      <div className='row'>

        <div className='select-carrier'>
          <h5 className='select-carrier--header'>Choose carrier: </h5>

          <Select
              showSearch={false}
              onSelect={this.onChange.bind(this)}
          >
            {options}
          </Select>

          <p className='select-carrier--description'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. At delectus, doloremque ducimus eveniet ex harum id porro qui sint tempora.</p>
        </div>

        {/* cards with search result */}
        <Cards cards={filtered} name={carriers.showedCarrier} />
      </div>

    </div>
  }
}



function mapStateToProps(state) {
  return {
    carriers: state.carriers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    CarriersActions: bindActionCreators(CarriersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
