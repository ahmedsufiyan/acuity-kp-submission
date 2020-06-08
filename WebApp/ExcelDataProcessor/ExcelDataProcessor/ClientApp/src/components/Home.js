import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = props => (
  <div>
    <h1>Acuity KP Programming Test</h1>
    <h2>Problem #2</h2>
    <p>Create a web-based application using.NET Core that allows the user to upload the data via the attached MS-Excel file,
    displays the data on the web page and allows the user to edit the data and then enables the user to export the edited data
    in the same MS-Excel format as was used for upload.</p>

    <p>Additionally, the application should allow the user to select if they want the app to download the logos for the companies in
    the dataset from the web. This could be a checkbox on the user interface, accompanied by a button which when clicked,
    the app must search the web to find logo images for the companies in the dataset and download and display the same
    against the company record on the UI. However, the export data functionality can exclude the logo from the export.</p>

    <p>An element of data cleaning may also be required considering that the data in the sample file has been scrapped from web
    and may contain anomalies. So, how does the program handles data elements and formatting is also an area of interest.</p>

    <p>It is advisable to use React or Angular as the front end. In addition to this, the middleware must be .NET webAPI (RESTFul).
    For MS-Excel processing, our advice is to use OpenXML but if the candidiate is comfortable with anything else, that is fine
    too. Supporting Unit tests, Swagger Integration for API documentation and Postman collections to be provided.</p>

    <strong><Link to="/fetchdata">Process Excel Data</Link></strong>
  </div>
);

export default connect()(Home);
