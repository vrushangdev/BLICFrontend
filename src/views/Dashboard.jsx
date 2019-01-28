import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import Web3 from 'web3';

// DropdownToggle,
// DropdownMenu,
// DropdownItem,
// UncontrolledDropdown,
// Label,

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  ListGroupItem,
  ListGroup,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
 
  FormGroup,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
  
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      adminAddress : "Click To Load",
      newAdminAddress:'',
      etherBalance:'',

    };
  }
  //Here Goes All Data For Required Component's 
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
 handleChange = (event)=>{
  this.setState({newAdminAddress: event.target.value});

 };
  setAdminAddress= () =>{

    let web3;
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // Set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
      }
    
//Let's Get Default Address 
    var account = web3.eth.accounts[0];
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
             }
    

      
    var abi = [
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_newAdmin",
                      "type": "address"
                  }
              ],
              "name": "changeAdmin",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_account",
                      "type": "address"
                  },
                  {
                      "name": "_registeredOn",
                      "type": "string"
                  },
                  {
                      "name": "_expiresOn",
                      "type": "string"
                  },
                  {
                      "name": "_hwid",
                      "type": "string"
                  }
              ],
              "name": "giveLicense",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "name": "_license_number",
                      "type": "uint256"
                  }
              ],
              "name": "transferFrom",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "account",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "LicenseGiven",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "admin",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "approved",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "Approval",
              "type": "event"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_account",
                      "type": "address"
                  }
              ],
              "name": "balanceOf",
              "outputs": [
                  {
                      "name": "balance",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getAdminAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseExpiresOnDate",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseHardwareId",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseRegisteredOnDate",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "licenseNumberToClient",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_license_number",
                      "type": "uint256"
                  }
              ],
              "name": "ownerOf",
              "outputs": [
                  {
                      "name": "owner",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "totalLicenses",
              "outputs": [
                  {
                      "name": "total",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          }
      ];
      
    var myContract = new web3.eth.Contract(abi, '0xD07ABc94E4fC6c9830195284Dbf0754EA7f74993', {
        from: account, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });
    console.log(myContract);
    myContract.methods.getAdminAddress().call().then(data => admin_address(data));

  let admin_address = (data)=>{
    let balance = web3.eth.getBalance(data);
        balance.then((bal)=>{
          this.setState({
            etherBalance : (bal/1000000000000000000).toString().concat(" ETH"),
          })
        })
      this.setState({
        adminAddress: data.toString(),
        

      });
      }
      };
  handleSetNewAdminAddress=()=>{

    let web3;
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // Set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
      }
    
//Let's Get Default Address 
    var account = web3.eth.accounts[0];
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
             }
    

      
    var abi = [
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_newAdmin",
                      "type": "address"
                  }
              ],
              "name": "changeAdmin",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_account",
                      "type": "address"
                  },
                  {
                      "name": "_registeredOn",
                      "type": "string"
                  },
                  {
                      "name": "_expiresOn",
                      "type": "string"
                  },
                  {
                      "name": "_hwid",
                      "type": "string"
                  }
              ],
              "name": "giveLicense",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "name": "_license_number",
                      "type": "uint256"
                  }
              ],
              "name": "transferFrom",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "account",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "LicenseGiven",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "admin",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "approved",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "Approval",
              "type": "event"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_account",
                      "type": "address"
                  }
              ],
              "name": "balanceOf",
              "outputs": [
                  {
                      "name": "balance",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getAdminAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseExpiresOnDate",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseHardwareId",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "licenseNumber",
                      "type": "uint256"
                  }
              ],
              "name": "getLicenseRegisteredOnDate",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "licenseNumberToClient",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_license_number",
                      "type": "uint256"
                  }
              ],
              "name": "ownerOf",
              "outputs": [
                  {
                      "name": "owner",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "totalLicenses",
              "outputs": [
                  {
                      "name": "total",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          }
      ];
      
    var myContract = new web3.eth.Contract(abi, '0xD07ABc94E4fC6c9830195284Dbf0754EA7f74993', {
        from: account, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });
    console.log(myContract);
    let newAddress = this.state.newAdminAddress;
    let oldAddress = this.state.adminAddress;
    myContract.methods.changeAdmin(newAddress).send({from : oldAddress});
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Licenses Sold</h5>
                      <CardTitle tag="h2">Licenses Issued</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Windows
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            MacOs
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Linux
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Smart Contract Details</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-wallet-43 text-info" />{" "}
                    <strong >Contract Address : 0xd07abc94e4fc6c9830195284dbf0754ea7f74993</strong>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                          <table responsive>
                          <thead className="text-primary">
                           <th className="badge badge-primary"> Smart Contract Details</th>
                          </thead>
                          <hr className="bg-primary"></hr>

                          <tbody  className="text-info">
                            <tr>
                              <td>
                                Name 
                              </td>
                              <td>
                                LicenseToken
                              </td>
                            </tr>
                            <tr>
                              <td>Owner 

                              </td>
                              <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                            </tr>
                            <tr>
                              <td>Total Licenses </td>
                              <td>50</td>
                            </tr>
                          </tbody>

                          </table>
                </CardBody> 
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Change Address
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart" onClick={()=>{this.setAdminAddress()}}>
                <CardHeader>
                  <h5 className="card-category">Change AdminEther Address</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-wallet-43 text-info" />{" "}
                    {this.state.etherBalance}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <strong className="text-info">{this.state.adminAddress}</strong>
                  <FormGroup>
                          <label>New Admin Address Goes Here : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                          />
                          <br></br>
                          <div className="text-center">
                          <span className=" badge badge-warning"><strong>Are You Sure You Want To Change Admin ?</strong> <br></br> New Admin Address : {this.state.newAdminAddress}</span>
                        
                          </div>
                          </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button  className="align-self-center btn-fill" color="primary" type="submit"
                  onClick={this.handleSetNewAdminAddress}
                  >
                    Change Address
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4">
            <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Give License Manually</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-paper text-info" />{" "}
                    Allocate License
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                          <label>Ethereum Address : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                          />
                          <label>Hardware Id</label>
                          <Input
                          placeholder="User Hardware Id"
                          type="text"
                          >
                         </Input>
                        </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Issue License
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4">
            <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Search For License Details</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-zoom-split text-info" />{" "}
                    Get License Details
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                          <label>Select License Index : </label>
                          <Input
                             list="blic"
                          />
                          <datalist id="blic">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>

                          </datalist>

                    </FormGroup>

                    <ListGroup flush >
                      <ListGroupItem className="text-primary">Owned By : //render address here</ListGroupItem>
                      <ListGroupItem className="text-primary">Registered On : //render registered on date here</ListGroupItem>
                      <ListGroupItem className="text-primary">Expires On: //render expires on data here</ListGroupItem>
                    </ListGroup>
                      
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Fetch Details
                  </Button>
                </CardFooter>
              </Card>
            
            </Col>
          </Row>
          <Row>
          <Col lg="4">
            <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Transfer License's </h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-double-right text-info" />{" "}
                    Transfer License
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                          <label>Select License Number : </label>
                          <Input
                             list="blic"
                          />
                          <datalist id="blic">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>

                          </datalist>
                          <label>Transfer From : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                          />
                        <label>Transfer To : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                          />
                    </FormGroup>

                    
                      
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                  Make Transfer
                  </Button>
                </CardFooter>
              </Card>
            
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Transaction Detail's </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Ethereum Address</th>
                        <th>Transactino Hash</th>
                        <th>Software Sold</th>
                        <th className="text-center">License Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                        <td>0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</td>
                        <td>Photoshop</td>
                        <td>Windows</td>
                        <td>
                        <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-check"></i>
                </Button>{` `}
                        </td>

                      </tr>
                      <tr>
                        <td><a href="https://etherscan.io/address/0x47aAAAec10349835914182b57D6CB28a6725dEe2">0x47aAAAec10349835914182b57D6CB28a6725dEe2</a></td>
                        <td><a href="https://etherscan.io/tx/0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a">0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</a></td>
                        <td>Auto Cad</td>
                        <td className="text-center">Mac</td>
                        <td>
                        <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-check"></i>
                </Button>{` `}
                        </td>
                      </tr>
                      <tr>
                        <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                        <td>0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</td>
                        <td>Android Studio</td>
                        <td className="text-center">Linux</td>
                        <td>
                        <Button className="btn-icon" color="warning" size="sm">
                    <i className="fa fa-spinner"></i>
                </Button>{` `}
                        </td>
                      </tr>

                      <tr>
                        <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                        <td>0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</td>
                        <td>Photoshop</td>
                        <td className="text-center">Windows</td>
                        <td>
                        <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-check"></i>
                </Button>{` `}
                        </td>
                      </tr>
                      <tr>
                        <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                        <td>0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</td>
                        <td>Auto Cad</td>
                        <td className="text-center">Mac</td>
                        <td>
                        <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-check"></i>
                </Button>{` `}
                        </td>
                      </tr>
                      <tr>
                        <td>0x47aAAAec10349835914182b57D6CB28a6725dEe2</td>
                        <td>0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</td>
                        <td>Android Studio</td>
                        <td className="text-center">Linux</td>
                        <td>
                        <Button className="btn-icon" color="warning" size="sm">
                    <i className="fa fa-spinner"></i>
                </Button>{` `}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
