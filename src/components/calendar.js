/* Import React dependencies */
import React from 'react';
import { Component } from 'react';

/* Calendar class */
export default class Calendar extends Component {
  
  // Initialize with props, and instantiate empty calendar object
	constructor(props) {
		super(props);
		this.calendar = {};
	}

  // removes the calendar from the DOM
	destroyFullCalendar() {
		$(this.calendar).fullCalendar('destroy');
	}

  // Renders calendar to the DOM
  // @param props - Accepts props FROM 
	renderFullCalendar(props) {

		$(this.calendar).fullCalendar({
			// Pass events from props
      events: props.events,

      // Set up custom buttons for sharing and creating events
			customButtons: {
        share: {
            text: 'Share Calendar',
            click: props.share
        },
        create: {
            text: 'Create New Event',
            click: props.create    
        }
	    },
      // Custom header, complete with custom buttons on right
	    header: {
				left: 'prev,next today month,agendaWeek,agendaDay',
				center: 'title',
				right: 'share, create'
			},

      // This removes a weird error where we get an extra week from next month for some reason
			weekMode: 'liquid',

      // 83% is a nicely viewable size for the calendar
			height: $(window).height()*0.83,

      // Prevents days from growing very large. Truncates events
			eventLimit: true,

      // Shows tooltip of the event title when you mouseover an event
			eventRender: function(event, element) {
      	$(element).tooltip({
      		title: event.title
      	});             
  		}
		});
	}

  // When Calendar component is rendered
  componentDidMount() {

    // Cache reference to calendar DOM object
  	this.calendar = this.refs.calendar;

    // Render calendar to DOM object
  	this.renderFullCalendar(this.props);
  }

  // When state updates
  componentWillUpdate(props, state) {

  	// Remove calendar
  	this.destroyFullCalendar();

  	// And re-render (only because we're using jQuery's fullCalendar. Ideally for performance we'd do this one day at a time)
  	this.renderFullCalendar(props);
  }


  // Clean up after Calendar view disappears
  componentWillUnmount() {

  	this.destroyFullCalendar();
  }



  render() {
    return (
      <div id="calendar" ref="calendar"></div>
    );
  }
}
