import React from "react"
import { Link } from "gatsby"
const Logo = (props) => (
  <div className="site-logo">
    <div class="brand">
<img src="/assets/logosite.png" style={{height: '35px', width: '35px', minWidth: '35px',verticalAlign: 'middle' , marginRight: '1rem'}}  alt="logo-site"></img>
   
    <Link to="/">{props.title}</Link>
  </div>
  </div>
)


export default Logo