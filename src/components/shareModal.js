import React from 'react';
import { Component } from 'react';
import Modal from 'react-awesome-modal';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';


export default class ShareModal extends Component {

  /* 
    <div className="modal">
            {this.props.children}
          </div>
  */
 
  constructor(props) {
    super(props);  

    this.state = { 
        newUserPermissions : "view",
        shareViaSMS: false,
        shareViaEmail: false,
        publicView: true
    }

    this.newUserPermissionsOptions = [
      { value: 'view', label: 'Can View' },
      { value: 'edit', label: 'Can Edit' },
      { value: 'share', label: 'Can Share' },
      { value: 'owner', label: 'Owner'}
    ];

  }

  handleNewUserPermissionsChange( value ) {
    this.setState( { newUserPermissions: value } );
  }

  // Toggle change
  handleSMSChange() {
    this.setState( { shareViaSMS: !this.state.shareViaSMS });
  }


  shareCalendar() {
    
  }

  

  render() {
    return (
      <Modal visible={this.props.isOpen} width="600" height="600" effect="fadeInUp">
        <div id="share-modal" className="my-modal">
          <header className="my-modal-header">
            <div className="left">
              <h2 className="title">Sharing Settings</h2>
            </div>
            <div className="right">
              <a data-tip data-class="custom-tooltip" data-for="question" ><i  className="fa fa-question-circle" aria-hidden="true"></i></a>
              <ReactTooltip id='question' place="bottom" type="dark" effect="solid">
                <span>Fill out the form below to share your calendar with others, and control their permissions</span>
              </ReactTooltip>
              <button className='btn btn-danger' onClick={this.props.closeModal}>Cancel</button>
            </div>
            <div className="clearfix"></div>
          </header>
          
          <div className="my-modal-body">
            <br/>
            <div id="share-link-label">
              <label>Share Link</label> <button className="btn btn-info clipboard">Copy to clipboard</button> 
            </div>
            <input type="text" id="share-link" value="https://www.pi.pardot.com/marketing-calendar/share?q=2lh2g4ohi2020h18hhasgag" />
            <br/>
            <div id="overall-access-control">
              <div id="share-via">
                <label>Share Via</label> 
                <div id="email-share" className="control-share">
                  <i id="email-share-icon" className="fa fa-envelope-square" aria-hidden="true"></i>
                  <span className="share-label">Email</span>
                </div>
                <div id="sms-share" className="control-share">
                  <i id="sms-share-icon" className="fa fa-comment" aria-hidden="true"></i>
                  <span className="share-label">SMS</span>
                </div>
                 
                
              </div>
              <div id="access-control">
                <label>Access Control</label>
                <div id="public-share" className="control-share">
                  <i className="fa fa-link" aria-hidden="true"></i>
                  <span className="share-label">Public Link</span>
                </div>
                <div id="users-share" className="control-share">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <span className="share-label">Users Below</span>
                </div>
              </div>
            </div>
            
            <div id="add-user-container">
              <input className="add-user-input" type="text" placeholder="Type Pardot user or email here"/> 
              <Select 
                value={this.state.newUserPermissions}
                options={this.newUserPermissionsOptions}
                onChange={this.handleNewUserPermissionsChange.bind(this)}

              />
              <button className="btn btn-info">+ Add User</button>
            </div>
          </div>
        </div>

        <div className="my-modal-footer">
          <button className="btn btn-success" onClick={() => this.props.onSaveAndClose( this.shareCalendar() ) }>Share Calendar</button>
          <button className="btn btn-danger" onClick={this.props.closeModal}>Cancel</button>
          <span className="help-link"><a href="http://help.pardot.com/customer/portal/articles/2127140-dashboard-overview-#Marketing_Calendar">Need help?</a></span>
        </div>
    </Modal>
    );
  } 
}