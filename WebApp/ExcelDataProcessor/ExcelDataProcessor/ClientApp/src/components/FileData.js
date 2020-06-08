
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/DataProcessor';
import { Button } from 'react-bootstrap';
import './FetchData.css';
import ShowData from './ShowData'

class FileData extends Component {
    extractDataFromFile = () => {
        this.props.requestDataProcessor(this.props.uploadFile)
    }

    render(){
        const { selectedFile, removeFile, extractedInfo } = this.props
        return (
            <div> 
                <h2>File Details:</h2> 
                <p>File Name: {selectedFile.name}</p> 
                <p>File Type: {selectedFile.type}</p> 
                <p> 
                Last Modified:{" "} 
                {selectedFile.lastModifiedDate.toDateString()} 
                </p> 
                <Button onClick={ this.extractDataFromFile } bsStyle="info">Process Data</Button> &nbsp;
                <Button onClick={() => { removeFile() }}>Remove File</Button>
                { extractedInfo && <ShowData /> }
            </div> 
        )
    }
}

export default connect(
    state => state.dataProcessor,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FileData);