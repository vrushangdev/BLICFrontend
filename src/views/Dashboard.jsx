import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import Web3 from 'web3';
import LicenseToken from '../backend/build/contracts/LicenseToken.json';


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
 Badge,
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
  state = { 
    bigChartData: "data1",adminAddress : null,newAdminAddress:null,
  etherBalance:null, web3: null, contract: null,
  hardwareid : null,
  clientAddress :null,
  contractAddress:null,
  block:null,
  number:null,
  hash:null,
  time:null,
  gas:null,

 };

  
  componentDidMount = async()=>
  {
    let web3;
    if (typeof web3 !== 'undefined') {
      web3 = await new Web3(web3.currentProvider);
      this.setState({web3});
    } else {
      // Set the provider you want from Web3.providers
      web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
      this.setState({web3});
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
    
  var myContract =await  new web3.eth.Contract(abi, '0xD07ABc94E4fC6c9830195284Dbf0754EA7f74993', {
      from: account, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
  console.log(myContract);
  this.setState({contract : myContract});
 // resolve(myContract);
  let utils = this.state.web3.utils;
  let address = await this.state.contract.methods.getAdminAddress().call();
  let balance = await this.state.web3.eth.getBalance(address);
  balance = utils.fromWei(balance, 'ether').toString().concat(" ETH");
  let contractAddress =  this.state.contract.address;

  this.setState({adminAddress: address,etherBalance:balance,contractAddress});
  var latestBlock = await this.state.web3.eth.getBlockNumber();
  console.log(latestBlock);
  var block = await this.state.web3.eth.getBlock(latestBlock);
  var hash = await block.hash.toString();
  var time = await block.timestamp;
  console.log(hash);
    this.setState({block:latestBlock,hash:hash,time:this.convertTimestamp(time)});
  return myContract;
  


};

constructor(props) {
  super(props);
  console.log(LicenseToken.abi);
  

}



 convertTimestamp=(time) =>{
  var d = new Date(time * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
      ampm = 'AM',
      time;
if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
  } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
  } else if (hh == 0) {
      h = 12;
  }
// ie: 2014-03-24, 3:00 PM
  var time1 = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
  return time1;
};






  //Here Goes All Data For Required Component's 
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
 handleChange = (event)=>{
  this.setState({newAdminAddress: event.target.value});

 };

 handleHardwareId = (event)=>{
  this.setState({hardwareid: event.target.value});

 };
 handleClientAddress = (event)=>{
  let utils = this.state.web3.utils;
  if(utils.isAddress(event.target.value)){
  this.setState({clientAddress: event.target.value});
  }
  else{
    this.setState({clientAddress: "Invalid Address !"});

  }

 };








  setAdminAddress= async () =>{
            let utils = this.state.web3.utils;
            let address = await this.state.contract.methods.getAdminAddress().call();
            let balance = await this.state.web3.eth.getBalance(address);

            balance = utils.fromWei(balance, 'ether').toString().concat(" ETH");
            this.setState({adminAddress: address,etherBalance:balance});
          };
  handleSetNewAdminAddress=async()=>{
    let contract = this.state.contract;
    let newAddress = this.state.newAdminAddress;
    let oldAddress = this.state.adminAddress;

    await contract.methods.changeAdmin(newAddress).send({from : oldAddress});
    this.setAdminAddress();
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
                    <h2 >Contract Address : {this.state.contractAddress}</h2>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                          <table responsive="true">
                          <thead className="text-primary">
                           <tr>
                           <th className="badge badge-primary"> Smart Contract Details</th>
                          
                           </tr>
                           <tr>
                            <td>
                            <hr className="bg-primary"></hr>

                            </td>
                           </tr>
                           </thead>

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
              <Card className="card-chart" >
                <CardHeader onPageShow={()=>{this.setAdminAddress()}}>
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
                          <label>Ethereum Address : {this.state.clientAddress}</label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleClientAddress}
                          />
                          <label>Hardware Id:{this.state.hardwareid} </label>
                          <Input
                          placeholder="User Hardware Id"
                          type="text"
                          value={this.state.value}
                          onChange={this.handleHardwareId}
                         
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
                        <th>Block Number</th>
                        <th>Transactino Hash</th>
                        <th>Time</th>
                        <th className="text-center">License Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">{this.state.block}</td>
                        <td>
                          <a className="primary" href={"https://etherscan.io/".concat(this.state.hash)}>{this.state.hash}</a>
                        </td>
                        <td>{this.state.time}</td>
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
