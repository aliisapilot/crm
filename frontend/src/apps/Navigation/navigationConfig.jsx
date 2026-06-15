/**
 * NAV_ITEMS — single source of truth for the sidebar navigation.
 *
 * Each entry:
 *   key          – must match the route segment (or 'dashboard' for '/')
 *   path         – the react-router path to navigate to
 *   icon         – <i> element using Tabler Icons webfont classes (ti ti-*)
 *   labelKey     – key passed to translate() from useLanguage
 *
 * Icons require the Tabler Icons CSS loaded in index.html:
 *   https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css
 *
 * To add a new nav item, just append one object here. Nothing else needs touching.
 */
const NAV_ITEMS = [
  {
    key: 'dashboard',
    path: '/',
    icon: <i className="ti ti-layout-dashboard" />,
    labelKey: 'dashboard',
  },
  {
    key: 'customer',
    path: '/customer',
    icon: <i className="ti ti-users" />,
    labelKey: 'customers',
  },
  {
    key: 'invoice',
    path: '/invoice',
    icon: <i className="ti ti-file-invoice" />,
    labelKey: 'invoices',
  },
  {
    key: 'quote',
    path: '/quote',
    icon: <i className="ti ti-file-description" />,
    labelKey: 'quote',
  },
  {
    key: 'payment',
    path: '/payment',
    icon: <i className="ti ti-credit-card" />,
    labelKey: 'payments',
  },
  {
    key: 'paymentMode',
    path: '/payment/mode',
    icon: <i className="ti ti-wallet" />,
    labelKey: 'payments_mode',
  },
  {
    key: 'taxes',
    path: '/taxes',
    icon: <i className="ti ti-receipt-tax" />,
    labelKey: 'taxes',
  },
  {
    key: 'generalSettings',
    path: '/settings',
    icon: <i className="ti ti-settings" />,
    labelKey: 'settings',
  },
  {
    key: 'about',
    path: '/about',
    icon: <i className="ti ti-info-circle" />,
    labelKey: 'about',
  },
];

export default NAV_ITEMS;
