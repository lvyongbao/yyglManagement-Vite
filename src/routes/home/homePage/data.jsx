import React from 'react';
import { Link } from 'dva/router';
import {
  Badge, TreeSelect, Select, message, Popover,
} from 'antd';
import { trim } from 'lodash';
import { getOption } from '@utils';
import ImagePreview from '@components/imgView';
import Style from './index.module.less';

const { Option } = Select;
const deep = (list = []) => list.map(({ id, name, children = [] }) => {
  if (children && children.length) {
    return {
      title: name,
      value: id,
      key: id,
      children: deep(children),
    };
  }
  return {
    title: name,
    value: id,
    key: id,
  };
});
const formData = () => [
];

// 表格参数
const columns = () => [
  {
    title: '图片标题',
    dataIndex: 'ctitle',
  },
  {
    title: '图片',
    dataIndex: 'cimagePath',
    render(text) {
      return <ImagePreview className={Style['banner-img']} src={text} alt="诺诺网" />;
    },
  },
  {
    title: '跳转链接',
    width: 240,
    dataIndex: 'curl',
    render(text) {
      return (
        <div className="yypt-two-ellipsis" style={{ WebkitBoxOrient: 'vertical' }}>
          <a href={text} target="_blank" rel="noreferrer">
            {text}
          </a>
        </div>
      );
    },
  },
  {
    title: '所属服务单位',
    width: 160,
    dataIndex: 'ccompanyname',
  },
  {
    title: '当前状态',
    width: 130,
    dataIndex: 'istatus',
    render(text, { csuggest }) {
      if (text === 0) {
        return <Badge status="default" text="已下架" />;
      }
      if (text === 1) {
        return <Badge status="warning" text="待提交审核" />;
      }
      if (text === 2) {
        return <Badge status="warning" text="待审核" />;
      }
      if (text === 3) {
        return (
          <>
            <Badge status="error" text="审核不通过" />
            <Popover
              content={(
                <div className="yypt-break" style={{ width: '200px' }}>
                  {csuggest}
                </div>
              )}
              trigger="click"
            >
              <a style={{ verticalAlign: 'inherit' }}>
                111
              </a>
            </Popover>
          </>
        );
      }
      if (text === 4) {
        return <Badge status="success" text="已上架" />;
      }
      return undefined;
    },
  },
  {
    title: '最近操作信息',
    width: 170,
    dataIndex: 'cusername',
    render(text, record) {
      const { dtDate } = record;
      return (
        <>
          <div>{text}</div>
          <div>{dtDate}</div>
        </>
      );
    },
  },
  {
    title: '操作',
    width: 60,
    render(_, record) {
      const { cid } = record;
      return (
        <Link to={`/homepage/banner/editBanner?id=${cid}`} className="yypt-block">
          编辑
        </Link>
      );
    },
  },
];

export { formData, columns };
