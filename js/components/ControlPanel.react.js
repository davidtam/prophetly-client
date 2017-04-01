import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';

import AppActions from '../actions/AppActions';

import 'react-select/dist/react-select.css';


class ControlPanelComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  actionGetForecastData(props) {
    AppActions.getForecastData(
      props.columnValues['datestamp-column'],
      props.columnValues['y-column'],
      props.selectedFile,
    );
  }

  actionUpdateColumnValue(column_id, column_value) {
    AppActions.updateColumnValue(column_id, column_value);
  }

  // closure based solution to the issue 1458 in the repo 'react-select'
  // https://github.com/JedWatson/react-select/issues/1458
  _createChangeHandler(name) {
    const onChange = (newValue) => this.actionUpdateColumnValue(name, newValue);
    return onChange;
  }

  render() {
    // to handle multiple sourced 'onChange' events
    const onChange = (name) => this._createChangeHandler(name);

    return (
      <Row>
        <Col xs={12}>
          <Row start="xs">
            <Col xs={3}>
              <Select
                name="datestamp-column"
                options={this.props.columns}
                placeholder="datestamp column"
                onChange={onChange("datestamp-column")}
                value={this.props.columnValues["datestamp-column"]}
                clearable={false}
              />
            </Col>
            <Col xs={3}>
              <Select
                name="y-column"
                options={this.props.columns}
                placeholder="y column"
                onChange={onChange("y-column")}
                value={this.props.columnValues["y-column"]}
                clearable={false}
              />
            </Col>
            <Col xs={3} xsOffset={3}>
              <button
                style={{'marginBottom': '40px'}}
                className="btn btn-block btn-danger btn-outline"
                id="upload-button"
                type="button"
                onClick={() => this.actionGetForecastData(this.props)}
              >
                <img
                  src="../../node_modules/octicons/build/svg/graph.svg"
                  style={{'position': 'relative', 'top': '3px', 'marginRight': '5px'}}
                />
                Forecast
              </button>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <div className="clearfix border p-1 bg-blue-light">
            <button
              className={`btn btn-sm left mr-3${this.props.selectedFile === '' ? ' disabled' : ''}`}
              type="button"
            >
              <img
                src="../../node_modules/octicons/build/svg/desktop-download.svg"
                style={{'position': 'relative', 'top': '3px', 'marginRight': '5px'}}
              />
              Download
            </button>
            <label>
              <input type="checkbox" disabled="disabled" onChange={this._updateCheckbox}/>
              <span className="ml-1">include previous data</span>
            </label>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ControlPanelComponent;
