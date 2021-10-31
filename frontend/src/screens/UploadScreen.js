import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import axios from 'axios';

const UploadScreen = () => {
  const [file, setFile] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = () => {
    console.log(file);
  };

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  //     const { data } = await axios.post('/api/upload', formData, config);

  //     setFile(data.imagePath);
  //     setUploading(false);
  //   } catch (e) {
  //     console.error(e);
  //     setUploading(false);
  //   }
  // };
  return (
    <div>
      <Form onSubmit={(e) => console.log(e)}>
        <Card>
          <Form.Group controlId='image'>
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
  );
};

export default UploadScreen;
