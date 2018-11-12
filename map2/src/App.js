//help from Ryan Waite, Doug Brown, Yahya Elharony, Rodrick Bloomfield, Forrest
import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API/';
import SideBar from './component/SideBar';

class App extends Component {
  constructor(){
    super();
    this.state ={
      venues:[],
      markers:[],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
//closes markers that aren't clicked
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

//opens marker infowindow and closes other info windows
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)})
    const venue = this.state.venues.find(venue => venue.id === marker.id);

//SquareAPI data
  SquareAPI.getVenueDetails(marker.id).then(res => {
    const newVenue = Object.assign(venue, res.response.venue);
    this.setState({venues: Object.assign(this.state.venues, newVenue)})
    });
  }

//opens infowindow for clicked marker
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }

//pulls info from FourSquare API
  componentDidMount() {
    SquareAPI.search({
      near: "Denver, CO",
      query: "food",
      limit: 20
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({ venues, center, markers});
    })
    .catch(error => {
       window.alert("Error getting data from FourSquare. " + error.message);
     });
}


  render() {
    return (
      <div role="main">
      <header className="header">Colorado Eats</header>
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
        <Map aria-label="map" {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
      </div>
    );
  }
}

export default App
