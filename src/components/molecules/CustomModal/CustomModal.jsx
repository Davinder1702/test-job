import React from 'react';
import './modal.scss';

function CustomModal({
  size = '',
  open,
  handleClose,
  children,
  className,
}) {
  if (!open) {
    return null;
  }
  return (
    <>
      <div className={`modal ${className}`}>
        <div className="modal-backdrop" onClick={handleClose} />
        <div className={`modal-dialog modal-${size}`}>
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13.7323 11.8873L22.6581 2.97547C23.0176 2.61613 23.1578 2.09219 23.0264 1.60121C22.8948 1.11047 22.5112 0.726965 22.0205 0.595325C21.5296 0.463922 21.0056 0.604101 20.6463 0.963675L11.7344 9.88946L2.82263 0.963675C2.46329 0.604099 1.93934 0.463922 1.44836 0.595325C0.957624 0.726965 0.574119 1.11049 0.442479 1.60121C0.311075 2.09218 0.451255 2.61613 0.810829 2.97547L9.73661 11.8873L0.810829 20.7991C0.542569 21.0652 0.391724 21.4274 0.391724 21.805C0.391724 22.1828 0.542575 22.545 0.810829 22.8109C1.07671 23.0791 1.43891 23.23 1.81671 23.23C2.19431 23.23 2.55652 23.0791 2.82259 22.8109L11.7344 13.8851L20.6462 22.8109C20.9124 23.0791 21.2746 23.23 21.6521 23.23C22.03 23.23 22.3922 23.0791 22.658 22.8109C22.9263 22.545 23.0771 22.1828 23.0771 21.805C23.0771 21.4274 22.9262 21.0652 22.658 20.7991L13.7323 11.8873Z" fill="#3D144C" />
                </svg>
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomModal;
