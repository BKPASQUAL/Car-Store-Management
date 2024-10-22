import React from "react";
import { Modal, Divider } from "rsuite";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../assets/css/LogoutModal.css'; // Import the CSS file

function LogoutModal({ open, handleClose, headtxt, bodytxt, btntxt }) {
  const navigate = useNavigate();

  const handlerLogout = async () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal-container">
      <Modal.Body className="modal-body">
        <div className="modal-header">
          <p className="modal-title">Logout</p>
          <div className="error-icon-container">
            <span className="material-symbols-outlined text-red">error</span>
          </div>
        </div>
        <Divider className="modal-divider" />
        <div className="modal-content">
          <p className="modal-text">Are you sure you want to logout?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handlerLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LogoutModal;
