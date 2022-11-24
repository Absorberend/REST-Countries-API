import "./Error.css";

import React from 'react'
import {Link} from "react-router-dom";

export default function Error() {
  

  return (
    <div className="error__container">
        <div className="error__text__wrapper">
            <h2>Oops!</h2>
            <h4>Sorry, it looks like we can't find this page anymore.</h4>
            <p>
              We have done our best, but it appears as if we can't find the page. 
              Maybe this page is moved or it doesn't exist.
            </p>
            <p>You can always go back to our <Link to="/" className="error__link">homepage</Link>.</p>
        </div>
    </div>
  )
}
