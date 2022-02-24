import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Table, Button, message, Modal,
} from 'antd';
import { getPagination, getBasicFn } from '@utils';
import { formData, columns } from './data';

const namespace = 'banner';
const propTypes = {
  banner: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.objectOf(PropTypes.any).isRequired,
};

function Banner({
  banner, loading,
}) {
  const { dispatchAction, getLoading } = getBasicFn({ namespace, loading });
  const {
    bannerTable,
    bannerPagination,
    bannerSearchData,
    bannerSelectedRowKeys,
    bannerSelectedRows,
  } = banner;
  function showConfirm(props) {
    Modal.confirm({
      ...props,
      className: 'yypt-confirm-modal',
    });
  }
  // 审核事件
  const handleReview = () => {
    if (bannerSelectedRowKeys && bannerSelectedRowKeys.length) {
      dispatchAction({
        type: 'reviewBannerCheck',
        payload: {
          idArray: bannerSelectedRowKeys.join(','),
        },
      }).then(() => {
        showConfirm({
          title: `确定要提交审核这${bannerSelectedRowKeys.length}条数据吗？`,
          onOk() {
            dispatchAction({
              type: 'reviewBanner',
              payload: {
                idArray: bannerSelectedRowKeys.join(','),
              },
            }).then(() => {
              message.success('提交成功');
              dispatchAction({
                type: 'getBannerTable',
                payload: {
                  ...bannerSearchData,
                  ...bannerPagination,
                },
              });
              dispatchAction({
                type: 'updateState',
                payload: {
                  bannerSelectedRowKeys: [],
                  bannerSelectedRows: [],
                },
              });
            });
          },
        });
      });
    } else {
      message.warning('请至少选择一条数据');
    }
  };
  /**
   * @description 上下架事件
   * @param {Number} flag 0为下架 4为上架
   */
  const handleState = (flag) => {
    if (bannerSelectedRowKeys && bannerSelectedRowKeys.length) {
      dispatchAction({
        type: 'changebannerStateCheck',
        payload: {
          istatus: flag,
          idArray: bannerSelectedRowKeys.join(','),
        },
      }).then(() => {
        showConfirm({
          title: `确定要上/下架这${bannerSelectedRowKeys.length}条数据吗？`,
          onOk() {
            dispatchAction({
              type: 'changebannerState',
              payload: {
                istatus: flag,
                idArray: bannerSelectedRowKeys.join(','),
                supportTag: flag
                  ? 'service_upperPortalHomepageImage'
                  : 'service_lowerPortalHomepageImage',
              },
            }).then(() => {
              message.success(flag === 0 ? '下架成功' : '上架成功');
              dispatchAction({
                type: 'getBannerTable',
                payload: {
                  ...bannerSearchData,
                  ...bannerPagination,
                },
              });
              dispatchAction({
                type: 'updateState',
                payload: {
                  bannerSelectedRowKeys: [],
                  bannerSelectedRows: [],
                },
              });
            });
          },
        });
      });
    } else {
      message.warning('请至少选择一条数据');
    }
  };
  // 删除
  const handleDelete = () => {
    if (bannerSelectedRowKeys && bannerSelectedRowKeys.length) {
      showConfirm({
        title: `确定要删除这${bannerSelectedRowKeys.length}条数据吗？`,
        onOk() {
          dispatchAction({
            type: 'deletebanner',
            payload: {
              guidArray: bannerSelectedRows.map((item) => item.cguid).join(','),
            },
          }).then(() => {
            message.success('删除成功');
            dispatchAction({
              type: 'getBannerTable',
              payload: {
                ...bannerSearchData,
                ...bannerPagination,
              },
            });
            dispatchAction({
              type: 'updateState',
              payload: {
                bannerSelectedRowKeys: [],
                bannerSelectedRows: [],
              },
            });
          });
        },
      });
    } else {
      message.warning('请至少选择一条数据');
    }
  };
  // 搜索条件
  const searchProps = {
    formData: formData(),
    onSearch: (value) => {
      dispatchAction({
        type: 'getBannerTable',
        payload: {
          ...bannerSearchData,
          ...value,
          current: 1,
          pageSize: 15,
        },
      });
      dispatchAction({
        type: 'updateState',
        payload: {
          bannerSelectedRowKeys: [],
          bannerSelectedRows: [],
        },
      });
    },
    initialValues: bannerSearchData,
  };

  // 列表参数
  const tableProps = {
    rowKey: 'cid',
    columns: columns(),
    dataSource: bannerTable,
    rowSelection: {
      selectedRowKeys: bannerSelectedRowKeys,
      onChange(selectedRowKeys, selectedRows) {
        dispatchAction({
          type: 'updateState',
          payload: {
            bannerSelectedRowKeys: selectedRowKeys,
            bannerSelectedRows: selectedRows,
          },
        });
      },
    },
    pagination: getPagination(bannerPagination),
    onChange(pagination) {
      dispatchAction({
        type: 'getBannerTable',
        payload: {
          ...bannerSearchData,
          ...pagination,
        },
      });
    },
    loading: getLoading('getBannerTable', 'deletebanner'),
  };
  // 按钮参数
  const buttonProps = {
    type: 'primary',
    className: 'yypt-mr12',
  };
  // 添加首焦图
  const addBanner = () => {};
  return (
    <div>
      {/* <SearchForm {...searchProps} /> */}
      <div className="yypt-pb16">
        <Link to="/homepage/banner/addBanner">
          <Button {...buttonProps} onClick={addBanner}>
            + 添加首焦图
          </Button>
        </Link>
        <Button {...buttonProps} onClick={handleReview}>
          提交审核
        </Button>
        <Button
          {...buttonProps}
          onClick={() => {
            handleState(4);
          }}
        >
          上架
        </Button>
        <Button
          {...buttonProps}
          onClick={() => {
            handleState(0);
          }}
        >
          下架
        </Button>
        <Button {...buttonProps} onClick={handleDelete}>
          删除
        </Button>
        <span>
          已选中
          <span className="yypt-num-count yypt-plr5">
            {bannerSelectedRowKeys.length}
          </span>
          条数据
        </span>
      </div>
      <Table {...tableProps} />
    </div>
  );
}
Banner.propTypes = propTypes;
export default connect(
  ({
    banner,
    loading,
  }) => ({
    banner, loading,
  }),
)(Banner);
