import React, { useState, useEffect } from 'react';
import { Card, Button, Banner, Spinner, BlockStack, Thumbnail, Checkbox,
Layout } from '@shopify/polaris';
import {ChevronRightIcon,ChevronLeftIcon} from '@shopify/polaris-icons';

import "../theme.css"
const ThemeView = ({ storeData, onThemeSelect, fetchThemes,setView }) => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(storeData?.theme || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themeData = await fetchThemes();
        setThemes(themeData);
      } catch (err) {
        setError('Failed to load themes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadThemes();
  }, [fetchThemes]);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleSubmit = async () => {
    if (!selectedTheme) {
      setError('Please select a theme before continuing.');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const result = await onThemeSelect(selectedTheme);
      if (!result.success) {
        throw new Error(result.message);
      }

      // Assuming the parent component handles navigation to the next view
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='theme' >
    <Card sectioned class='theme' >
      {error && <Banner status="critical">{error}</Banner>}

      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner size="large" />
          <p>Loading themes...</p>
        </div>
      ) : (
        <div>
          <Layout wrap>
            {themes.map((theme, index) => (
              <Layout.Section variant="oneThird"
                key={index}
                sectioned
                title={theme.name}
                onClick={() => handleThemeSelect(theme)}
                subdued={selectedTheme?.name !== theme.name}
                style={{
                  border: selectedTheme?.name === theme.name ? '2px solid #5c6ac4' : '1px solid #dfe3e8',
                }}
              >
                <BlockStack vertical alignment="center">
                  <Thumbnail
                    source={theme.image}
                    alt={theme.name}
                    size="large"
                  />
                  <Checkbox
                    label=""
                    checked={selectedTheme?.name === theme.name}
                    onChange={() => handleThemeSelect(theme)}
                  />
                </BlockStack>
              </Layout.Section>
            ))}
          </Layout>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
           <Button  icon={ChevronLeftIcon}  style={{marginRight:'10px'}} primary onClick={()=>setView(1)} 
           disabled={isSubmitting}>
            Back 
            </Button>

            <Button primary onClick={handleSubmit} disabled={isSubmitting}  icon={ChevronRightIcon} >
              {isSubmitting ? 'Submitting...' : 'Continue'}
            </Button>
          </div>
        </div>
      )}
    </Card>
    </div>
  );
};

export default ThemeView;
