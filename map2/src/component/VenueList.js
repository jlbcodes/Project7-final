//help from Ryan Waite, Doug Brown, Yahya Elharony, Rodrick Bloomfield, Forrest
import React, {Component} from 'react';
import ListItem from './ListItem'

export default class VenueList extends Component {
  render() {
    return (
      <ol tabIndex="0" role="list" aria-labelledby="venues list"className="venueList">
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListItem key={idx} {...venue} handleListItemClick={this.props.handleListItemClick}/>
          ))}
      </ol>
    )
  }
}
