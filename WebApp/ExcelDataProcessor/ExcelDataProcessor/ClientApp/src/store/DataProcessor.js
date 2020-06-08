const uploadDataFileType = 'UPLOAD_DATA_FILE';
const resetExcelDataType = 'RESET_EXCEL_DATA'
const requestDataProcessorType = 'REQUEST_DATA_PROCESSOR';
const receiveDataProcessorType = 'RECEIVE_DATA_PROCESSOR';
const initialState = { uploadFile: null, extractedInfo: null, isLoading: false };

export const actionCreators = {
  uploadDataFile: file => async (dispatch) => {
    dispatch({ type: uploadDataFileType, file })
  },

  resetExcelData: () => ({ type: resetExcelDataType }),

  requestDataProcessor: fileData => async (dispatch, getState) => {    
    if (fileData === getState().dataProcessor.fileData) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestDataProcessorType, fileData });

    const url = `api/DataProcessor/ProcessExcel`;
    
    const response = await fetch(url, {
      method: "POST", 
      // Adding body or contents to send 
      body: JSON.stringify({
        file: fileData
      }), 
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    await response.json().then(data => {
      dispatch({ type: receiveDataProcessorType, fileData, data });
    });
    
    
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === uploadDataFileType){
    return {
      ...state,
      uploadFile: action.file,
    };
  }

  if (action.type === requestDataProcessorType) {
    return {
      ...state,
      uploadFile: action.base64Data,
      isLoading: true
    };
  }

  if (action.type === receiveDataProcessorType) {
    return {
      ...state,
      uploadFile: action.base64Data,
      extractedInfo: action.data,
      isLoading: false
    };
  }

  if (action.type === resetExcelDataType){
    return {
      ...state,
      extractedInfo: null,
    };
  }

  return state;
};
