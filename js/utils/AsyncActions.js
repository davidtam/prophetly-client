'use strict';

import Axios from 'axios';

import AppActions from '../actions/AppActions';


const AsyncActions = {
  fetchFileList() {
    Axios.get('http://localhost:8888/upload')
    .then(function (response) {
      AppActions.setFileList(response.data.files);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  deleteFile(file) {
    Axios.post('http://localhost:8888/filedata/' + file)
    .then(function (response) {
      AppActions.deleteFileSuccess(file);
    })
    .catch(function (error) {
      //AppActions.deleteFileError();
    })
  },

  fetchFileData(file) {
    console.log('AsyncActions fetchFileData', file);
    Axios.get('http://localhost:8888/filedata/' + file)
    .then(function (response) {
      AppActions.setFileData(file, response.data);
    })
    .catch(function (error) {
      console.log();
    });
  },

  fetchColumnsData(file) {
    Axios.get('http://localhost:8888/column/' + file)
    .then(function (response) {
      AppActions.setColumnsData(file, response.data.columns);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  fetchForecastData(dsColumnValue, yColumnValue, selectedFile) {
    Axios.get('http://localhost:8888/data', {
      params: {
        ds: dsColumnValue,
        y: yColumnValue,
        file: selectedFile
      }
    })
    .then(function(response) {
      AppActions.setForecastData(response.data.plots);
    })
    .catch(function(error) {
      AppActions.showNotification('danger', error.response.data, 0);
    });
  },
};

export default AsyncActions;
