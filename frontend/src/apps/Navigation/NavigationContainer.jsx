import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useAppContext } from '@/context/appContext';
import useLanguage from '@/locale/useLanguage';
import useResponsive from '@/hooks/useResponsive';

import logoIcon from '@/style/images/logo-icon.svg';
import logoText from '@/style/images/logo-text.svg';

import NAV_ITEMS from './navigationConfig.jsx';

const { Sider } = Layout;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derive the active menu key from the current pathname.
 *
 * Rules:
 *   '/'             → 'dashboard'
 *   '/payment/mode' → 'paymentMode'   (check exact paths before prefix match)
 *   '/invoice/...'  → 'invoice'
 */
function getActiveKey(pathname) {
  if (pathname === '/') return 'dashboard';

  // Exact match first (handles multi-segment paths like /payment/mode)
  const exact = NAV_ITEMS.find((item) => item.path === pathname);
  if (exact) return exact.key;

  // Prefix match (handles nested routes like /invoice/read/:id)
  const prefix = NAV_ITEMS.find(
    (item) => item.path !== '/' && pathname.startsWith(item.path)
  );
  return prefix ? prefix.key : '';
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export default function Navigation() {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

// ---------------------------------------------------------------------------
// Sidebar (desktop)
// ---------------------------------------------------------------------------

function Sidebar({ collapsible, isMobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const translate = useLanguage();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;

  // Delay hiding the logo text until the collapse animation finishes
  const [showLogoText, setShowLogoText] = useState(!isNavMenuClose);

  useEffect(() => {
    if (isNavMenuClose) {
      setShowLogoText(false);
    } else {
      const timer = setTimeout(() => setShowLogoText(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isNavMenuClose]);

  // Build Ant Design Menu items from the config array
  const menuItems = NAV_ITEMS.map(({ key, path, icon, labelKey }) => ({
    key,
    icon,
    label: <Link to={path}>{translate(labelKey)}</Link>,
  }));

  const activeKey = getActiveKey(location.pathname);

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : false}
      onCollapse={navMenu.collapse}
      className="navigation"
      width={256}
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && { left: '20px', top: '20px' }),
      }}
    >
      {/* Logo */}
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />
        {showLogoText && (
          <img
            src={logoText}
            alt="Logo"
            style={{ marginTop: '3px', marginLeft: '10px', height: '38px' }}
          />
        )}
      </div>

      {/* Menu */}
      <Menu
        items={menuItems}
        mode="inline"
        theme="light"
        selectedKeys={[activeKey]}
        style={{ width: 256 }}
      />
    </Sider>
  );
}

// ---------------------------------------------------------------------------
// MobileSidebar
// ---------------------------------------------------------------------------

function MobileSidebar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={() => setVisible(true)}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>

      <Drawer
        width={250}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
