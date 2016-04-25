/* Import React dependencies */
import React from 'react';
import { Component } from 'react';

// Import Calendar component
import Calendar from './calendar';

// Import modal classes
import CreateEventModal from './createEventModal';
import ShareModal from './shareModal';

// Import pre-rendered events
import events from '../events';

/* Main App */
export default class App extends Component {


	// Establish initial state with modals closed and imported events
  constructor( props ) {
    super( props );
    this.state = {
    	events : events, 
      isCreateEventModalOpen : false,
      isShareModalOpen : false
    };
  }

  /* Modal events */
  openCreateEventModal() {
    this.setState( { isCreateEventModalOpen: true } );
  }

  openShareModal() {
    this.setState( { isShareModalOpen: true } );
  }

  closeCreateEventModal() {
    this.setState( { isCreateEventModalOpen : false } );
  }

  closeShareModal() {
    this.setState( { isShareModalOpen : false } );
  }

  /* Click events from fullcalendar buttons  */
	onCreate() {
		this.openCreateEventModal();
	}
  onShare() {
  	this.openShareModal();
  }


  render() {
    return (
    	<div id="app">
	    	<CreateEventModal 
	    		isOpen={ this.state.isCreateEventModalOpen }
	    		onSaveAndClose={ newEvent => this.setState( { isCreateEventModalOpen: false, events : [ ...this.state.events, newEvent ] } ) }
	    		closeModal={ this.closeCreateEventModal.bind( this ) }
	    	/>
	    	<ShareModal 
	    		isOpen={ this.state.isShareModalOpen }
	    		onSaveAndClose={ newEvent => this.setState( { isShareModalOpen: false, events : [ ...this.state.events, newEvent ] } ) }
	    		closeModal={ this.closeShareModal.bind( this ) }
	    	/>

	      <Calendar
	      	events={ this.state.events }
	      	share={ this.onShare.bind( this ) }
	      	create={ this.onCreate.bind( this ) }
	      />
	    </div>
    );
  }
}