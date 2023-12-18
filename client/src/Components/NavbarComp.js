import React, { Component } from "react";
import { Form,Button,Navbar, Nav} from 'react-bootstrap';
import "./css/Navbar.css";

class NavbarComp extends Component{
    
    render()
    {
      let isLogged = this.props.isLogged?true:false;
    
        return (
          <div >
            <Navbar className="glassynavbar">
              <Navbar.Brand href="#home">EHR using blockchain</Navbar.Brand>
              <Nav className="mr-auto">{}</Nav>
              <Form inline>
                {}
                {isLogged ? (
                  <Button
                    variant="outline-light"
                    onClick={() => this.props.onlogout()}
                  >
                    Logout
                  </Button>
                ) : (
                  <div></div>
                )}
                {this.props.accounts ? (
                  <Button
                    variant="outline-light"
                    onClick={() => this.props.onlogout()}
                  >
                   {this.props.accounts[0]}
                  </Button>
                ) : (
                  <div></div>
                )}
              </Form>
            </Navbar>
          </div>
        );
    }
}


export default NavbarComp;