import React, { useState } from 'react';
import { Form, Card, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';

const UploadScreen = () => {
  const [file, setFile] = useState('');
  const [uploading, setUploading] = useState(false);
  const [statisticHeaders, setStatisticHeaders] = useState([]);
  const [statisticValues, setStatisticValues] = useState([]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('csvFile', file);
    setUploading(true);
    console.log(e.target.files[0]);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      const statisticArr = data.split('#');
      setStatisticHeaders(statisticArr[0].split(', '));
      setStatisticValues(statisticArr[1].split(','));
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };
  return (
    <>
      <div className='d-flex justify-content-around align-items-center mb-5 mx-auto'>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant='top'
            src='https://user-images.githubusercontent.com/53815961/139601273-9e9e9dd4-e7e7-4cef-8e4a-4c1ccc2fc650.png'
          />
          <Card.Body>
            <Card.Title>CSV file format</Card.Title>
            <Card.Text>
              To generate a report analysing integers in a .csv file, be sure to
              have a single column of numbers and ensure the header has the word
              "number"
            </Card.Text>
          </Card.Body>
        </Card>
        <Form>
          <Card>
            <Form.Group controlId='csv-file'>
              <Form.Label>CSV File</Form.Label>
              <Form.Control
                type='text'
                placeholder='Filename'
                value={file}
                onChange={(e) => setFile(e.target.value)}
              ></Form.Control>
              <Form.File
                id='csvFile'
                label='CSV File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
          </Card>
        </Form>
      </div>
      {uploading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : statisticHeaders.length > 0 && statisticValues.length > 0 ? (
        <div className='d-flex justify-content-center p-5'>
          <Table striped bordered hover>
            <thead>
              <tr>
                {statisticHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {statisticValues.map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UploadScreen;
