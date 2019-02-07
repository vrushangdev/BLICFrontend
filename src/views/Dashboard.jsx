import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import Web3 from 'web3';
import LicenseToken from '../backend/build/contracts/LicenseToken.json';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'


// DropdownToggle,
// DropdownMenu,
// DropdownItem,
// UncontrolledDropdown,
// Label,

// reactstrap components
import {
  Alert,
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  transactionInfo:[],
  gas:null,
  queriedLicense:0,
  OwnedBy:null,
  registeredOn:null,
  expiresOn:null,
  modal:false,
  fromAddress:null,
  toAddress:null,
  totalLicenses:null,
  licenseNumber:null,
  data:null,

 };

  
  componentWillMount = async()=>
  {

    let web3;
    if (typeof web3 != 'undefined') 
    {
      web3 = await new Web3(web3.currentProvider);
      this.setState({web3});
    } else {
      // Set the provider you want from Web3.providers
      web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
      this.setState({web3});
    }
  
//Let's Get Default Address 
  var account = this.state.web3.eth.defaultAccount;
  // console.log(account);

  var abi = LicenseToken.abi;
    
  var myContract =await  new web3.eth.Contract(abi, '0xcF3E24aC11a9CE619a7273ce59706Bf8bd4eE974', {
      from: account, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
  // console.log(myContract);
  this.setState({contract : myContract});
 // resolve(myContract);
  let utils = this.state.web3.utils;
  let address = await this.state.contract.methods.getAdminAddress().call();
  let balance = await this.state.web3.eth.getBalance(address);
  balance = utils.fromWei(balance, 'ether').toString().concat(" ETH");
  let contractAddress =  this.state.contract.address;

  this.setState({adminAddress: address,etherBalance:balance,contractAddress});
  var latestBlock = await this.state.web3.eth.getBlockNumber();
  let totalLicenses = await this.state.contract.methods.totalLicenses().call();
this.setState({totalLicenses});
  console.log(latestBlock);
  var transactionInfo=[];
  for(let i=latestBlock;i>(latestBlock-12);i--){
    var block = await this.state.web3.eth.getBlock(i);

    var info = {};
    // console.log(i);

    let curretnBlock = await block.hash.toString();
    let blockTime = await block.timestamp;
    blockTime=this.convertTimestamp(blockTime);
    info.block = i;
    info.time = blockTime;
    info.hash = curretnBlock;
    transactionInfo.push(info);
    // console.log(transactionInfo);


  }
 
  var data={}
  // let totalLicenses = await this.state.contract.methods.totalLicenses().call();

  for(let j=0;j<totalLicenses;j++){
   let curr_date = await this.state.contract.methods.getLicenseRegisteredOnDate(j).call();
   data[curr_date] = (data[curr_date] || 0) + 1;

  }
   
  console.log(data);
  this.setState({data});
  ReactChartkick.addAdapter(Chart)

    this.setState({transactionInfo});
  return myContract;
  


};

constructor(props) 
{
  super(props);
  console.log(LicenseToken.abi);
}


//Change Time To Human Readable Format
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
  } else if (hh === 0) {
      h = 12;
  }
// ie: 2014-03-24, 3:00 PM
  let time1 = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
  return time1;
};






  //Here Goes All Data For Required Component's 
  setBgChartData = async() => {
    
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
  handleLicenseDetails=async(event)=>{
    this.setState({queriedLicense:event.target.value});    
  }
  getLicenseDetails=async()=>{
    let licenseNumber = parseInt(this.state.queriedLicense);  
    // console.log(licenseNumber);
    let contract = await this.state.contract;
try {
  let hardwareid = await contract.methods.getLicenseHardwareId(licenseNumber).call();
  let OwnedBy = await contract.methods.licenseNumberToClient(licenseNumber).call();
  let registeredOn = await contract.methods.getLicenseRegisteredOnDate(licenseNumber).call();
    // console.log(registeredOn);
    let expiresOn = await contract.methods.getLicenseExpiresOnDate(licenseNumber).call();
    // console.log(expiresOn);
    this.setState({OwnedBy,registeredOn,expiresOn,hardwareid});

} catch (error) {
  this.setState({OwnedBy : "License Not Found",registeredOn:"License Not Found",expiresOn:"License Not Found",hardwareid:"License Not Found"});

  
}
    //let OwnedBy =await contract.methods.licenseNumberToClient(licenseNumber).call();
    

  }
  issueLicense= async()=>{
    let contract = await this.state.contract;
    let address = this.state.clientAddress.toString();
    let hardwareid = this.state.hardwareid.toString();
    let adminAddress = this.state.adminAddress;
    // var date = (new Date());

    var date = (new Date());
    var newdate=new Date((date.getFullYear() + 1),date.getMonth(),date.getDay());
    date = date.toString()
    newdate = newdate.toString()

    //var newdate=new Date((date.getFullYear() + 1),date.getMonth(),date.getDay());
    console.log(newdate);
    try {
      console.log(address,date,newdate,hardwareid);
      console.log("Licesns : " ,contract.methods);
      let res = await contract.methods.giveLicense(address,date,newdate,hardwareid).send({from :adminAddress,gas:4712388,gasPrice: 100000000000});
      //console.log(licenseIssued);
      // alert("License Issued !");
      console.log(res);
      this.toggle();

    } catch (error) {
      console.log(error);
      alert("Unable To Issue License !");
    }
  }
  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    });
  };
 trasnferLicense=async()=>{
   try {
    let contract = await this.state.contract;
    let adminAddress = this.state.adminAddress;
    let _from = this.state.OwnedBy;
    let _to = this.state.toAddress;
    let licenseNumber = parseInt(this.state.queriedLicense);
    

    await contract.methods.transferFrom(_from,_to,licenseNumber).send({from :adminAddress,gas:4712388,gasPrice: 100000000000});
     
   } catch (error) {
     console.log(error);
   }
 }
 handleFromChange=async(event)=>{
  this.setState({fromAddress:event.target.value})
 }
 handleToChange=async(event)=>{
  this.setState({toAddress:event.target.value})

 }
  render() {
    

    return (
      

      <>
           
        <div className="content">
        <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Licesne Issued Sucessfully</ModalHeader>
          <ModalBody>
            
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Done</Button>{' '}
            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
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
                          className={classNames("btn-simple active")}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData()}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Total Licenses
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                         </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <LineChart
                    data={this.state.data}
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
                          <thead className="text-info">
                           <tr>
                           <th className="badge badge-info"> Smart Contract Details</th>
                          
                           </tr>
                           <tr>
                            <td>
                            <hr className="bg-info"></hr>

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
                              <td>{this.state.adminAddress}</td>
                            </tr>
                            <tr>
                              <td>Total Licenses </td>
                              <td>{this.state.totalLicenses}</td>
                            </tr>
                          </tbody>

                          </table>
                </CardBody> 
                <CardFooter>
                  <Button className="btn-fill" color="info" type="submit"
                  onClick={()=>{window.location.reload()}}
                  >
                    Reload
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
                  <Button  className="align-self-center btn-fill" color="info" type="submit"
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
                          <label>Hardware Id: </label>
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
                  <Button className="btn-fill" color="info" type="submit"
                  onClick={this.issueLicense}
                  >
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
                          <label>Selected License Index : {this.state.queriedLicense}</label>
                          <Input
                          type="text"
                          value={this.state.queriedLicense}
                          onChange={this.handleLicenseDetails}
                          />
                         

                    </FormGroup>

                    <ListGroup flush >
                      <ListGroupItem className="text-info">Owned By : {this.state.OwnedBy}</ListGroupItem>
                      <ListGroupItem className="text-info">Hardware Id : {this.state.hardwareid}</ListGroupItem>

                      <ListGroupItem className="text-info">Registered On : {this.state.registeredOn}</ListGroupItem>
                      <ListGroupItem className="text-info">Expires On: {this.state.expiresOn}</ListGroupItem>

                    </ListGroup>
                      
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="info" type="submit"
                  onClick={this.getLicenseDetails}
                  >
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
                          type="text"
                          value = {this.state.queriedLicense}
                          onChange={this.trasnferLicense}
                          />
                         
                          <label>Transfer From : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                            value={this.state.OwnedBy}
                            onChange={this.handleFromChange}
                          />
                        <label>Transfer To : </label>
                          <Input
                            placeholder="Ethereum Address"
                            type="text"
                            value={this.state.toAddress}
                            onChange={this.handleToChange}
                          />
                    </FormGroup>

                    
                      
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="info" type="submit"
                  onClick={this.trasnferLicense}
                  >
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
                    <thead className="text-info">
                      <tr>
                        <th>Block Number</th>
                        <th>Transactino Hash</th>
                        <th>Time</th>
                        <th className="text-center">Network</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.transactionInfo.map((info)=>{
                      let link = "https://etherscan.io/tx/"+info.hash;
                        return(
                          <tr>
                            <td>
                              {info.block}
                            </td>
                            <td>
                              <a href={link}>{info.hash}</a>
                            </td>
                            <td>
                              {info.time}
                            </td>
                            <td>
                              Ganache
                            </td>
                            <td>
                        <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-check"></i>
                </Button>{` `}
                        </td>
                          </tr>
                        )
                    })}
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
