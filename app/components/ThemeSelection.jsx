ThemeSelection.jsimport React, { useState, useEffect } from 'react';
import { Card, BlockStack, Button, Banner, Checkbox } from '@shopify/polaris';

const ThemeSelection = ({ storeData, onSubmit, fetchThemes }) => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(storeData?.theme || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themesData = await fetchThemes();
        setThemes(themesData);
      } catch (err) {
        setError('Failed to load themes.');
      }
    };

    loadThemes();
  }, [fetchThemes]);

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName);
  };

  const handleSubmit = async () => {
    try {
      const result = await onSubmit(selectedTheme);
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card sectioned>
      {error && <Banner status="critical">{error}</Banner>}

      <BlockStack vertical spacing="loose">
        {themes.map((theme) => (
          <div
            key={theme.name}
            style={{
              border: '1px solid #dfe3e8',
              borderRadius: '4px',
              padding: '10px',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: theme.name === selectedTheme ? '#f4f6f8' : 'white',
            }}
            onClick={() => handleThemeSelect(theme.name)}
          >
            <img
              src={theme.image}
              alt={theme.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{theme.name}</div>
            <Checkbox
              checked={theme.name === selectedTheme}
              label=""
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            />
          </div>
        ))}
      </BlockStack>

      <div style={{ marginTop: '20px' }}>
        <Button primary onClick={handleSubmit} disabled={!selectedTheme}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default ThemeSelection;
