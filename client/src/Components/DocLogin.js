import React, { Component } from "react";
import { Button } from "react-bootstrap";
import im from "./img/docim1.jpg"; // Import the image path
import im2 from "./img/i1.jpg";
import im3 from "./img/p11.jpg";
import im4 from "./img/oic2.jpg";
import im5 from "./img/insimg.png";
import "./css/DocLogin.css";
import "./css/forbg.css"

class DocLogin extends Component {
 
   


  
  state = { textvalue: "", formNum: false, age: 0, pat_reg_login: 0 };
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;

  async checkDoc(event) {
    event.preventDefault(true);
    var result = null;
    try {
      let adhaar_number = document.getElementById("doc_adhaar_number").value;
      result = await this.cont["OPT"].methods
        .checkDoctorInfo(adhaar_number)
        .call({ from: this.Acc[0] });
      console.log("result", result);
      if (!result[0]) alert("Invalid Credentials. Contact Respective Hospital");
      else this.props.onlogin(result[1], 0);
    } catch (err) {
      alert("Invalid Credentials. ");
    }
  }

  async registerPat(event) {
    event.preventDefault(true);
    let name = document.getElementById("patient_name").value;
    let gender = document.getElementById("patient_gender").value;
    let contact_info = document.getElementById("patient_cont").value;
    console.log("connected account is---->", this.Acc[0]);
    await this.cont["OPT"].methods
      .signupPatient(name, contact_info, gender)
      .send({ from: this.Acc[0] });
    console.log(name);
    console.log(gender);
    console.log(contact_info);
  }

  async checkPat(event) {
    event.preventDefault(true);

    var result = null;
    try {
      let adhaar_number = document.getElementById("pat_adhaar_number").value;
      result = await this.cont["OPT"].methods
        .checkPatientInfo(adhaar_number)
        .call({ from: this.Acc[0] });
      console.log(result);
      if (!result[0])
        alert(
          "Invalid Credentials. Make sure Account Address and Adhaar Number is entered correctly"
        );
      else this.props.onlogin(result[1], 1);
    } catch (err) {
      alert(
        "Invalid Credentials. Make sure Account Address and Adhaar Number is entered correctly"
      );
    }
  }

  async checkHospital(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont["OPT"].methods
        .getHospitalInfo()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 2);
    } catch (err) {
      alert("Owner has not created your hospital account");
    }

    console.log("Hospital check");
  }

  async checkOwner(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont["OPT"].methods
        .getOwnerInfo()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 3);
    } catch (err) {
      alert("You are not the owner");
    }
    console.log("Owner check");
  }

  async checkInsuranceComp(event) {
    event.preventDefault();
    var result = null;
    try {
      result = await this.cont["OPT"].methods
        .getInsuranceCompInfo()
        .call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 4);
    } catch (e) {
      alert("You are not registered by the owner");
    }
  }

  patientLoginForm() {
    this.setState({ pat_reg_login: 1 });
  }

  patientRegisterForm() {
    this.setState({ pat_reg_login: 0 });
  }

  render() {
   
    this.checkDoc = this.checkDoc.bind(this);
    this.registerPat = this.registerPat.bind(this);
    this.checkPat = this.checkPat.bind(this);
    this.checkHospital = this.checkHospital.bind(this);
    this.checkOwner = this.checkOwner.bind(this);
    this.checkInsuranceComp = this.checkInsuranceComp.bind(this);
    this.patientLoginForm = this.patientLoginForm.bind(this);
    this.patientRegisterForm = this.patientRegisterForm.bind(this);

    const ownerForm = (
      <div className="container" >
        <div>
          <img id="oimg" src={im4} alt="" />
        </div>

        <div style={{ marginLeft: "20px" }}>
          <form id="ffo">
            
        <h5  className="htel" style={{ align: "centre" }}>Owner</h5>
            <br></br>
            <Button variant="dark" className="button" onClick={this.checkOwner}>
              Login By Address
            </Button>
          </form>
        </div>
      </div>
    );

    const hospitalForm = (
      <div className="container">
        <div >
          <img id='image-style2' src={im2} alt="chek" />
        </div>
        

        <div style={{ marginLeft: "20px" }}>
          <form>
          {/* <h5  className="htel" style={{ align: "centre" }}>Hospital</h5> */}
            <br></br>
            <Button
              variant="dark"
              className="button"
              id="bforhos"
              onClick={this.checkHospital}
            >
              Login By Address
            </Button>
          </form>
        </div>
      </div>
    );

    const insuranceCompForm = (
      <div className="container">
        <div id="insimgg">
          <img src={im5} alt="" />
        </div>
       

        <div style={{ marginLeft: "20px" }}>
          <form>
          <h5  id='ichid'className="htel" style={{ align: "centre" }}>Insurance Comp.</h5>
            <br></br>
            <Button
              variant="dark"
              className="button"
              onClick={this.checkInsuranceComp}
            >
              Login By Address
            </Button>
          </form>
        </div>
      </div>
    );

    const docForm = (
     
    
      <div className="container">
        <div>
          <img  className="image-style"  src={im} alt="hey" />
        </div>
       
       

        <div style={{ marginLeft: "20px" }}>
          <form>
          {/* <h4 className="htel" style={{ align: "centre"}}>Doctor</h4> */}
           

            <input
              type="text"
              name="adhaar_number"
              id="doc_adhaar_number"
              placeholder="Enter your Adhaar Number"
              className="form-control"
            ></input>
            <br></br>

            <Button variant="dark" className="button" onClick={this.checkDoc}>
              Login As Doctor
            </Button>
          </form>
        </div>
      </div>
    );

    const patForm = (
      <div className="mycont2">
        {/* <div>
          <img id="ifim3" src={im3} alt="" />
        </div> */}
      <div id="pdiv">
        <div>
          <h5  className="htel" style={{ align: "centre" }}>Patient</h5>
        </div>
        <Button
          className="button"
          variant="dark"
          onClick={this.patientRegisterForm}
          style={{margin:'0.5rem'}}
        >
          Register Patient
        </Button>
        <Button
          className="button"
          variant="dark"
          onClick={this.patientLoginForm}
        >
          Login
        </Button>

        {this.state.pat_reg_login === 0 ? (
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <form onSubmit={this.registerPat}>
              {/* <div className="label mt-2">
                <b>Enter Name</b>
              </div> */}

              <input
                type="text"
                name="name"
                id="patient_name"
                placeholder="Enter your Name"
                className="form-control"
              />

              <br></br>

           

              <input
                type="text"
                name="address"
                id="patient_address"
                placeholder="Address"
                className="form-control"
              ></input>
              <br></br>
              <div className="nd">
              {/* <div className="label mt-2">
                <b>Gender</b>
              </div> */}

      


              {/* <div className="label mt-2">
                <b>Contact Info</b>
              </div> */}

              <input
                type="text"
                name="contact info"
                id="patient_cont"
                placeholder="Contact Info"
                className="form-control"
              ></input>
              </div>
              <br></br>
              <select id="patient_gender" name="gender">
  <option value="" disabled selected hidden>Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Transgender">Transgender</option>
  <option value="Others">Others</option>
</select>
<br />

              <Button id="rbtn" className="button" variant="dark" type="submit">
                Register Patient
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <div className="tc" >
              <b >Adhaar Number</b>
            </div>

            <input
              type="text"
              name="adhaar_number"
              id="pat_adhaar_number"
              placeholder="Adhaar Number"
              className="form-control"
            ></input>
            <br></br>

            <Button
              className="button"
              variant="dark"
              onClick={this.checkPat.bind(this)}
            >
              Login As Patient
            </Button>
          </div>
        )}
      </div>
      </div>
    );

    const fNum = this.state.formNum;

    let loadForm;
    if (fNum == 0) loadForm = docForm;
    else if (fNum == 1) loadForm = patForm;
    else if (fNum == 2) loadForm = hospitalForm;
    else if (fNum == 3) loadForm = ownerForm;
    else if (fNum == 4) loadForm = insuranceCompForm;
    const buttonStyle = {
      margin: '0.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background using rgba with alpha 0
      border: '1px solid rgba(0, 0, 0, 0.5)', // Example border with some transparency
      color: 'black', // Text color
      padding: '8px 16px', // Adjust padding as needed
      borderRadius: '4px', // Rounded corners
      /* Add other styles as needed */
      transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
     color : 'white',
     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
     
    };
   
    

    return (
      
     
    
   
      <div className="dlbody">
        <div className="alterBut">
          <Button id="b1"
           
            onClick={(event) => this.setState({ formNum: 0 })}
            style={buttonStyle}
            
          
            
          >
            Doctor
          </Button>

          <Button
           
           style={buttonStyle}
            onClick={(event) => this.setState({ formNum: 1 })}
          >
            Patient
          </Button>

          <Button
             style={buttonStyle}
            
            
          
            onClick={(event) => this.setState({ formNum: 2 })}
          >
            Hospital
          </Button>

          <Button
              style={buttonStyle}
            onClick={(event) => this.setState({ formNum: 3 })}
          >
            Owner
          </Button>

          <Button
             style={buttonStyle}
            onClick={(event) => this.setState({ formNum: 4 })}
          >
            Insurance Comp.
          </Button>
        </div>

        <fieldset>{loadForm}</fieldset>
      </div>
   
    );
  }
}

export default DocLogin;
