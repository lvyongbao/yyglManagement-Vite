import { message } from 'antd';
import { modelExtend, getServices } from '@utils';

const services = getServices({
  getbanner: 'service/yyptback/support/getDataByParamPOST.do', // 获取图片列表
});

const ohterServices = getServices(
  {
    getbanner: 'service/yyptback/support/getDataByParamPOST.do', // 获取图片列表
  },
  false,
);

const list = [
  {
    ccompanyid: 'L1234567890',
    ccompanyname: '藏宝阁',
    cguid: '551339c8efd6443f8aace80e5d082b25',
    cid: 2954,
    cimagePath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F03%2F20200303231306_dgnrt.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648284865&t=29017e5b14de4901cfed5d900745f35c',
    companyIdsStr: '',
    csuggest: '',
    ctitle: 'demo1',
    curl: 'https://github.com/lvyongbao',
    cusername: '大宝1',
    dtDate: '2021-11-24 10:57:29',
    istatus: 0,
  },
  {
    ccompanyid: 'L1234567891',
    ccompanyname: '藏宝阁',
    cguid: 'a9133f2184d94d3d94426719c31dc32e',
    cid: 3027,
    cimagePath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fys_bnew_img%2F00%2F10%2F73%2FUJ8m14akSU.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648284865&t=6d2d4ff6cc7ba8fab79c2b4b29bb5b8e',
    companyIdsStr: '',
    csuggest: '',
    ctitle: 'demo2',
    curl: 'https://github.com/lvyongbao',
    cusername: '大宝2',
    dtDate: '2021-11-17 11:30:17',
    istatus: 4,
  },
];

const namespace = 'banner';
const initState = {
  bannerSearchData: {}, // 搜索条件
  bannerPagination: {
    current: 1,
    pageSize: 15,
  }, // 分页参数
  bannerTable: list, // 列表数据
  bannerSelectedRowKeys: [], // 列表勾选结果id
  bannerSelectedRows: [], // 列表勾选结果
};

export default modelExtend({
  namespace,
  state: initState,
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/homepage/banner') {
          if (history.action !== 'POP') {
            dispatch({ type: 'updateState', payload: initState });
          }
          // 获取服务单位
          dispatch({
            type: 'app/getServiceUnit',
          });
          dispatch({
            type: 'getBannerTable',
          });
        }
      });
    },
  },
  reducers: {},
  effects: {
    // 获取首焦图列表
    * getBannerTable({ payload = {} }, { call, put, select }) {
      const { bannerSearchData, bannerPagination } = yield select(({ banner }) => banner);
      const { data } = yield call(services.getbanner, {
        ...bannerSearchData,
        ...bannerPagination,
        ...payload,
        supportTag: 'service_getPortalHomepageImageList',
      });
      const midData = { ...bannerSearchData, ...bannerPagination, ...payload };
      yield put({
        type: 'updateState',
        payload: {
          bannerTable: data.list,
          bannerPagination: {
            current: midData.current,
            pageSize: midData.pageSize,
            total: data.total,
          },
          bannerSearchData: midData,
        },
      });
    },
    // 首焦图审核验证
    * reviewBannerCheck({ payload }, { call }) {
      yield call(services.getbanner, { ...payload, supportTag: 'service_validAuditImage' });
    },
    // 首焦图审核
    * reviewBanner({ payload }, { call }) {
      yield call(services.getbanner, {
        ...payload,
        supportTag: 'service_auditPortalHomepageImage',
      });
    },
    // 首焦图上下架验证
    * changebannerStateCheck({ payload }, { call }) {
      yield call(services.getbanner, { ...payload, supportTag: 'service_validUpperOrlowerImage' });
    },
    // 首焦图上下架
    * changebannerState({ payload }, { call }) {
      yield call(services.getbanner, { ...payload });
    },
    // 首焦图删除
    * deletebanner({ payload }, { call }) {
      yield call(services.getbanner, {
        ...payload,
        supportTag: 'service_deletePortalHomepageImage',
      });
    },
    // 添加首焦图
    * addbanner({ payload }, { call }) {
      const data = yield call(ohterServices.getbanner, {
        ...payload,
        supportTag: 'service_addPortalHomepageNewstypeList',
      });
      // message.success('添加成功')
      return data;
    },
    // 编辑频道
    * editbanner({ payload }, { call }) {
      yield call(services.getbanner, {
        ...payload,
        supportTag: 'service_updatePortalHomepageNewstype',
      });
      message.success('修改成功');
    },
  },
});
