import React from 'react';


const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">

            <button className="btn btn-dark " type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    &nbsp; Loading...
            </button>
        </div>
    )
};

export default Spinner;