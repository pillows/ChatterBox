import React from "react";
import $ from 'jquery';
class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false
        }
        this.handleCloseClick = this.handleCloseClick.bind(this);
      }
  componentDidMount() {
  const { handleModalCloseClick } = this.props;
  $(this.modal).modal('show');
  $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
  }
  handleCloseClick() {
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal('hide');
    handleModalCloseClick();
  }


    render(){
        console.log(this.state)
        const { showModal } = this.state;
        return (
          <div className="modal fade" ref={modal=> this.modal = modal} id="keyModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Modal title</h4>
                </div>
                <div className="modal-body">
                  <p>One fine body&hellip;</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Modal;
