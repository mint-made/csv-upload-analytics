import React, { useState } from 'react';
import { Form, Card, Spinner, Table, Row, Col, Alert } from 'react-bootstrap';
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
  const genStatisticStatement = (statisticArr) => {
    if (statisticArr.length === 6) {
      return `There are ${statisticArr[0]}
        integers with a mean of ${statisticArr[1]}, with a range from ${statisticArr[5]} to ${statisticArr[4]}. The most common value is ${statisticArr[3]} which occured ${statisticArr[2]} time(s).`;
    }
  };

  return (
    <>
      <Row className='d-flex justify-content-around align-items-center mb-5 mx-auto'>
        <Col sm={12} md={6} className='mb-3' style={{ width: '18rem' }}>
          <Card className='rounded'>
            <Card.Img
              variant='top'
              src='https://user-images.githubusercontent.com/53815961/139601273-9e9e9dd4-e7e7-4cef-8e4a-4c1ccc2fc650.png'
            />
            <Card.Body>
              <Card.Title>CSV file format</Card.Title>
              <Card.Text>
                To generate a report analysing integers in a .csv file, be sure
                to have a single column of numbers and ensure the header has the
                word "number"
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Form>
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
          </Form>
        </Col>
      </Row>
      {uploading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : statisticHeaders.length > 0 && statisticValues.length > 0 ? (
        <div className='d-flex flex-column align-items-center  p-5'>
          <Alert variant='success'>
            Your report has been successfully generated
          </Alert>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                {statisticHeaders.map((header, index) => (
                  <th className='p-2' key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {statisticValues.map((value, index) => (
                  <td className='p-2 text-center' key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
          <p>
            {statisticValues.length === 6 &&
              genStatisticStatement(statisticValues)}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UploadScreen;
