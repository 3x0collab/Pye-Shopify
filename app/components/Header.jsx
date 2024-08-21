import React from 'react';
import { AppProvider, TopBar } from '@shopify/polaris';

const Header = () => {
  // Empty TopBar userMenu for now, as we only need the header title.
  const userMenu = <TopBar.UserMenu />;

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenu}
      logo={{
        width: 124,
        topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1b116ae200beef2a282174d8a550f8f8.svg',
        accessibilityLabel: 'AI Support',
        url: '#',
      }}
    />
  );

  return (
    <AppProvider>
      <div style={{ height: '64px' }}>
        {topBarMarkup}
      </div>
    </AppProvider>
  );
};

export default Header;
