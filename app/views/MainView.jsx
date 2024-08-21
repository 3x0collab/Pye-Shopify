import React, { useState } from 'react';
import { Card, TextField, Button, Banner, DropZone, BlockStack, Thumbnail } from '@shopify/polaris';
import {ChevronRightIcon} from '@shopify/polaris-icons';
const MainView = ({ storeData, onSubmit }) => {
  const [name, setName] = useState(storeData?.name || '');
  const [logo, setLogo] = useState(storeData?.logo || null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (value) => setName(value);

  const handleDropZoneDrop = (_dropFiles, acceptedFiles) => {
    setLogo(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    if (!name  ) {
      setError('Name is required');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const result = await onSubmit({ name, logo });
      if (!result.success) {
        throw new Error(result.message);
      }

      // Assuming the parent component handles navigation to the next view
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/svg+xml'];

  return (
    <Card sectioned >
      {error && <Banner status="critical">{error}</Banner>}

      <TextField
        label="Chatbot Name"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your chatbot's name"
        autoComplete="off"
      />

      <div style={{ marginTop: '20px' }}>
      <p style={{color:'green'}} > Click or drag and drop image: </p>
        <DropZone accept="image/*" type="image" onDrop={handleDropZoneDrop}>
          {logo ? (
            <BlockStack alignment="center">
              <Thumbnail
                size="large"
                alt={logo.name}
                source={
                  validImageTypes.includes(logo.type)
                    ? window.URL.createObjectURL(logo)
                    : ''
                }
              />
              <div>
                {logo.name} <br />
                {Math.round(logo.size / 1024)} KB
              </div>
            </BlockStack>
          ) : (
            <DropZone.FileUpload />
          )}
        </DropZone>
      </div>

      <div style={{ marginTop: '20px' }}>


        <Button size='large' primary onClick={handleSubmit} icon={ChevronRightIcon} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </Button>
      </div>
    </Card>
  );
};

export default MainView;
