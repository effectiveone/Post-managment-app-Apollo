import * as React from 'react'
import Portal from './Portal'

type Props = {
  children?: React.ReactNode;
};

const Modal = ({ children }:Props)  => {
  return (
    <Portal id="portal">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // onClick={onClose}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: '20px',
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
          {/* <button
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '10px',
            }}
            onClick={onClose}
          >
            Close Modal
          </button> */}
        </div>
      </div>
    </Portal>
  )
}

export default Modal