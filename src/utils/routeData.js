// facilitator工作台路由
const facilitatorRouteList = [
  {
    path: 'myClient',
    name: '我的首页',
    children: [
      {
        path: 'myHome',
        name: '我的客户',
        models: () => [import('../routes/myClient/models')],
        component: () => import('../routes/myClient/index'),
        children: [
          {
            path: 'addMyClient',
            name: '新增客户',
            back: true,
            models: () => [import('../routes/myClient/detailModels')],
            component: () => import('../routes/myClient/detail'),
          },
          {
            path: 'lookClient',
            name: '客户信息',
            back: true,
            models: () => [import('../routes/myClient/lookClientModels')],
            component: () => import('../routes/myClient/lookClient'),
          },
        ]
      },
      {
        path: 'setUser',
        name: '个人中心',
        models: () => [import('../routes/myClient/setUserDetail/models')],
        component: () => import('../routes/myClient/setUserDetail/index'),
      },
    ],
  },
  {
    path: 'home',
    name: '藏宝阁',
    children: [
      {
        path: 'homePage',
        name: '首页管理',
        models: () => [import('../routes/home/homePage/models')],
        component: () => import('../routes/home/homePage/index'),
        // children: [
        //   {
        //     path: 'addBanner',
        //     name: '添加图片',
        //     back: true,
        //     models: () => [import('../routes/myClient/detailModels')],
        //     component: () => import('../routes/myClient/detail'),
        //   },
        //   {
        //     path: 'editBanner',
        //     name: '编辑图片',
        //     back: true,
        //     models: () => [import('../routes/myClient/lookClientModels')],
        //     component: () => import('../routes/myClient/lookClient'),
        //   },
        // ]
      },
      {
        path: 'setUser',
        name: '个人中心',
        models: () => [import('../routes/myClient/setUserDetail/models')],
        component: () => import('../routes/myClient/setUserDetail/index'),
      },
    ],
  },
  {
    path: 'homepage',
    name: '首页管理',
    children: [
      {
        path: 'addBanner',
        name: '添加图片',
        back: true,
        models: () => [import('../routes/home/homePage/models')],
        component: () => import('../routes/home/homePage/index'),
      },
      {
        path: 'editBanner',
        name: '编辑图片',
        models: () => [import('../routes/financial/statements/models')],
        component: () => import('../routes/financial/statements/index'),
      },
    ],
  },
];

const routes = [];

function loopRoutes(list, parentKey = '') {
  for (const item of list) {
    const { path, name, models, component, children } = item;

    const pathProp = `${parentKey}/${path}`;
    if (component) {
      routes.push({
        path: pathProp,
        models,
        component,
        name,
      });
    }
    if (Array.isArray(children) && children.length) {
      loopRoutes(children, pathProp);
    }
  }
}

// 生成路由树
loopRoutes(facilitatorRouteList);

const breadcrumbs = {};

function loopBreadcrumb(list, parentKey = '') {
  for (const item of list) {
    const { path, back, name, children } = item;

    const pathProp = `${parentKey}/${path}`;
    breadcrumbs[pathProp] = {
      name,
      back,
    };

    if (Array.isArray(children) && children.length) {
      loopBreadcrumb(children, pathProp);
    }
  }
}

// 生成面包屑对象
loopBreadcrumb(facilitatorRouteList);

export { routes, breadcrumbs };
