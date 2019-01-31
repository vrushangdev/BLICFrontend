import React, { Component } from 'react';;
import {Button,Table} from "reactstrap";
  
class TransactionTable extends React.Component{
constructor(props) {
        super(props);
        this.state = {
         details : {
          EthereumAddress :"0x47aAAAec10349835914182b57D6CB28a6725dEe2",
          TransactionHash : "0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a",
          SoftwareSold:"Photoshop",
          LicenseType:"Windows",
          status:true,},

    
        };
      }
render(){
return(
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
        {this.state.details.map(detail=>{
                  <tr>
                  <td>{detail.EthereumAddress}</td>
                  <td>{detail.TransactionHash}</td>
                  <td>{detail.SoftwareSold}</td>
                  <td>{detail.LicenseType}</td>
                  <td>
                  <Button className="btn-icon" color="success" size="sm">
          <i className="fa fa-check"></i>
      </Button>{` `}
                  </td>
                </tr>
        });}
      <tr>
        <td><a href="https://etherscan.io/address/0x47aAAAec10349835914182b57D6CB28a6725dEe2">0x47aAAAec10349835914182b57D6CB28a6725dEe2</a></td>
        <td><a href="https://etherscan.io/tx/0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a">0x3386137958829890bf5d0ad8351e2a2fec85648ab35a4debecdb678fe47ad51a</a></td>
        <td>Auto Cad</td>
        <td className="text-center">Mac</td>
        <td>
        
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

);

}

}

export default TransactionTable;