
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/DataProcessor';
import { Button, Table } from 'react-bootstrap';
import './FetchData.css';

class ShowData extends Component {
    constructor(props){
        super(props)
        this.state = {
            excelData: props.extractedInfo,
            isEdit: false,
            currentEditRow: null,
            tempSaveData: null,
        }
    }

    toggleEdit = (rowIndex) => {
        let editRowIndex = rowIndex
        var tempData = this.state.excelData
        if(this.state.isEdit) {
            editRowIndex = null;
            tempData = null;
        }
        this.setState({
            isEdit: !this.state.isEdit,
            currentEditRow: editRowIndex,
            tempSaveData: tempData
        })
    }
    
    saveInfo = () => {
        var tempData= Object.assign({}, this.state.tempSaveData);
        this.setState({ 
            excelData: tempData,
            isEdit: false,
            currentEditRow: null,
            tempSaveData: null,
        })
    }

    handleTextUpdate = (event, rowIndex, cellIndex) => {
        var expData = JSON.parse(JSON.stringify(this.state.excelData));
        expData.excelRowContent[rowIndex].cellValues[cellIndex] = event.target.value
        this.setState({
            tempSaveData: expData
        })
    }

    render(){
        const { extractedInfo } = this.props
        const { excelData, isEdit, currentEditRow } = this.state
        return (
            <div> 
                <Table className="extractedTable" responsive>
                <thead>
                    <tr>
                    {
                        excelData.excelHeaders.map((column,index) => {
                            return (
                                <th key={index}>{column}</th>
                            )
                        })
                    }
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        excelData.excelRowContent.map((rowData,rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        rowData.cellValues.map((cell,cellIndex) => {
                                            return (
                                                <td className="tableCell" key={cellIndex}>{
                                                        isEdit && currentEditRow === rowIndex ?
                                                        <input className="tableButton" value={this.state.tempSaveData.excelRowContent[rowIndex].cellValues[cellIndex]} onChange={(e) => this.handleTextUpdate(e, rowIndex, cellIndex)} type="text" id="cellIndex" />
                                                        : cell
                                                    }</td>
                                            )
                                        })
                                    }
                                    <td>{isEdit && currentEditRow === rowIndex && <Button bsStyle="default" onClick={()=>{ this.saveInfo(rowIndex) }}>Save</Button>}
                                    <Button bsStyle="default" onClick={()=>{ this.toggleEdit(rowIndex) }}>{isEdit && currentEditRow === rowIndex ? 'Cancel': 'Edit'}</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </Table>
                <Button bsStyle="primary">Export Data to Excel</Button>
            </div>
        )
    }
}

export default connect(
    state => state.dataProcessor,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ShowData);