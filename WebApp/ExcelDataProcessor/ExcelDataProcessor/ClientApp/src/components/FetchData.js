import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileData from './FileData'
import { actionCreators } from '../store/DataProcessor';
import './FetchData.css';

class FetchData extends Component {
  state = {
    selectedFile: null
  }
   onFileChange = async(event) => {
    const file = event.target.files[0]
    this.setState({ selectedFile: file })
    await this.toBase64(file).then(response=>{
      this.props.uploadDataFile(response);
    })
  }; 

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  removeFile = () => {
    this.setState({ selectedFile: null })
    this.props.uploadDataFile(null);
    this.props.resetExcelData()
    document.getElementById("upload-form").reset();
  }

  render() {
    return (
      <div>
        <h1>Data Processor</h1>
        <p>This component allows the user to upload the data via the attached MS-Excel file,
        displays the data on the web page and allows the user to edit the data and then enables the user to export the edited data.</p>
        <form id="upload-form">
        {!this.state.selectedFile && <input className="fileChooser" type="file" onChange={this.onFileChange} accept=".xls,.xlsx" />}
        </form>
        { 
          this.state.selectedFile ? <FileData selectedFile={this.state.selectedFile} removeFile={this.removeFile} /> :
          <div> 
            <br /> 
            <h4>Choose an excel file to extract data</h4>
          </div> 
        }
      </div>
    );
  }
}

export default connect(
  state => state.dataProcessor,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
