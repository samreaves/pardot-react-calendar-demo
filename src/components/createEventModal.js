import React from 'react';
import { Component } from 'react';
import Modal from 'react-awesome-modal';
import ReactTooltip from 'react-tooltip';
import DateTimeField from 'react-bootstrap-datetimepicker';
import Moment from 'moment';

export default class CreateEventModal extends Component {

  /* 
    <div className="modal">
            {this.props.children}
          </div>
  */
 
  constructor(props) {
    super(props);  

    this.state = { 
        title: "", 
        start: "", 
        end: "", 
        allDay: false, 
        url: ""
      } 
  }


  handleTitleChange( event ) {
    this.setState( { title : event.target.value } );
  }

  handleStartChange( event ) {
    this.setState( { start : event.target.value } );
  }

  handleEndChange( event ) {
    this.setState( { end : event.target.value } );
  }

  handleAllDayChange( event ) {
    this.setState( { allDay : event.target.value } );
  }

  handleURLChange( event ) {
    this.setState( { url: event.target.value } );
  }

  generateDateAndTime() {
    return Moment().format('MMMM Do YYYY, HH:mm');
  }

  saveEvent() {
    let newEvent = {
      title : this.state.title,
      start : new Date(),
      end : new Date(),
      allDay : this.state.url
    }
    return newEvent;
  }

  

  render() {
    return (
      <Modal visible={this.props.isOpen} width="600" height="700" effect="fadeInUp">
        <div className="my-modal">
          <header className="my-modal-header">
            <div className="left">
              <h2 className="title">Create Custom Event</h2>
            </div>
            <div className="right">
              <a data-tip data-class="custom-tooltip" data-for="question" ><i  className="fa fa-question-circle" aria-hidden="true"></i></a>
              <ReactTooltip id='question' place="bottom" type="dark" effect="solid">
                <span>Fill out the form below and save your event</span>
              </ReactTooltip>
              <button className='btn btn-danger' onClick={this.props.closeModal}>Cancel</button>
            </div>
            <div className="clearfix"></div>
          </header>
          
          <div className="my-modal-body">
            <br/>
            <label className="required">Title<sup>*</sup></label>
            <input type="text" class="styled-input" onChange={ this.handleTitleChange.bind( this ) } value={ this.state.title } required />
            <br/>
            <br/>
            <label>All Day</label>
            <input type="checkbox" onChange={ this.handleAllDayChange.bind( this ) } /> select to choose only dates (ignore times)
            <br/>
            <br/>
            <label className="required">Start<sup>*</sup></label>
            <div id="start-date">
              <DateTimeField 
                mode="date"
              />
                
            </div>
            <div id="start-time">
              <DateTimeField 
                mode="time" />
            </div>
            <br/>
            <p className="optional">Current date and time in your timezone: {this.generateDateAndTime()}</p>
            <br/>
            <label className="required">End</label>
            <div id="end-date">
              <DateTimeField 
                mode="date"

              />
            </div>
            <div id="end-time">
              <DateTimeField 
                mode="time" />
            </div>
            <p className="optional">
              Optional: Default duration is 2 hours for non-all-day events / 1 day for all-day events
            </p>
            <br/>
            <label>URL</label>
            <input 
              type="text" 
              onChange={this.handleURLChange.bind( this ) } />
            <p className="optional">Optional: Website that clicking on the event will lead to</p>
            {/* images of icon and color change here */}
            <img className="static-image" src="http://www.samreavesdigital.com/img/icon-selector.png"/>
            <img className="static-image" src="http://www.samreavesdigital.com/img/bg-selector.png"/>
          </div>
        </div>

        <div className="my-modal-footer">
          <button className="btn btn-success" onClick={() => this.props.onSaveAndClose( this.saveEvent() ) }>Create Event</button>
          <button className="btn btn-danger" onClick={this.props.closeModal}>Cancel</button>
        </div>
    </Modal>
    );
  } 
}