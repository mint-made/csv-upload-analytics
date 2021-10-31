import React, { useState } from 'react';
import { Form, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const UploadScreen = () => {
  const [file, setFile] = useState('');
  const [uploading, setUploading] = useState(false);

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

      //setFile(data.imagePath);
      console.log(data);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };
  return (
    <div>
      <Form onSubmit={(e) => console.log(e)}>
        <p>{file}</p>
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
          {uploading ? (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          ) : (
            <></>
          )}
        </Card>
      </Form>
    </div>
  );
};

export default UploadScreen;
