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
    <div>
      <Form>
        <Card>
          <Form.Group controlId='csv-file' className='mb-5 mx-auto'>
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
        {uploading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : statisticHeaders.length > 0 && statisticValues.length > 0 ? (
          <div className='d-flex justify-content-center'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {statisticHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                  <th></th>
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
      </Form>
    </div>
  );
};

export default UploadScreen;
