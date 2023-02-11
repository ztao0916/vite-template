import { getMenus } from '@/api/user';

getMenus().then((res) => {
  console.log(res);
});
