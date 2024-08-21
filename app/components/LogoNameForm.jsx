import React, { useState } from 'react';
import { FormLayout, TextField, Button, Banner, Card, DropZone, BlockStack, Thumbnail } from '@shopify/polaris';

const LogoNameForm = ({ storeData, onSubmit }) => {
  const [name, setName] = useState(storeData?.name || '');
  const [logo, setLogo] = useState(storeData?.logo || '');
  const [error, setError] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleNameChange = (value) => setName(value);

  const handleDropZoneDrop = (_dropFiles, acceptedFiles) => {
    setLogoFile(acceptedFiles[0]);
    const logoUrl = URL.createObjectURL(acceptedFiles[0]);
    setLogo(logoUrl);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        name,
        logo,
      };

      const result = await onSubmit(formData);
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fileUpload = !logo && <DropZone.FileUpload />;
  const uploadedLogo = logoFile && (
    <BlockStack>
      <Thumbnail
        size="large"
        alt={logoFile.name}
        source={logo}
      />
      <div>{logoFile.name}</div>
    </BlockStack>
  );

  return (
    <Card sectioned>
      <FormLayout>
        {error && <Banner status="critical">{error}</Banner>}

        <TextField
          value={name}
          onChange={handleNameChange}
          label="Name"
          placeholder="Enter the name"
          autoComplete="off"
        />

        <DropZone onDrop={handleDropZoneDrop}>
          {uploadedLogo}
          {fileUpload}
        </DropZone>

        <Button primary onClick={handleSubmit}>
          Continue
        </Button>
      </FormLayout>
    </Card>
  );
};

export default LogoNameForm;
