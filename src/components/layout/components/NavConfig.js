import Iconify from 'components/iconify';
import { ROUTES } from 'utils/constants';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: ROUTES.HOME,
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'health',
    path: ROUTES.HEALTH,
    icon: getIcon('healthicons:health'),
  },
];

export default navConfig;
