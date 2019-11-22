import React, { useContext, useState, useEffect } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ReactDOM from 'react-dom';
import { Pagination, Table, Divider, Button, Select } from 'antd';
import LocalizedModal from '../../components/modal/Modal';
function FetchUsers() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [sortData, setSortData] = useState([
    {
      sortBy: 'ASC',
      sortValue: 'id',
    },
  ]);
  const [search, setSearch] = useState([{}]);

  const {
    userStore: {
      users,
      getUsers,
      loading,
      block,
      unBlock,
      blockLoading,
      deleteLoading,
      delete: _delete,
      unDelete,
      totalCount,
    },
  } = useContext(rootStore);

  useEffect(() => {
    let body = {};
    body.sort = sortData;
    body.search = [];
    getUsers(page, count, body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, count, sortData, search]);
  console.log(toJS(users));

  function onChange(pageNumber) {
    setPage(pageNumber);
  }
  console.log('totalCount', totalCount);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Notification',
      dataIndex: 'notificationsOnOff',
      key: 'notificationsOnOff',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            loading={blockLoading === record.id}
            onClick={() => {
              record.isBlocked ? unBlock(record.id) : block(record.id);
            }}
            type={!record.isBlocked ? 'danger ' : 'primary'}
          >
            {record.isBlocked ? 'UNBLOCK' : '   BLOCK   '}
          </Button>
          <Divider type="vertical" />
          <Button
            loading={deleteLoading === record.id}
            onClick={() => {
              record.deletedAt !== null
                ? unDelete(record.id)
                : _delete(record.id);
            }}
            type={record.deletedAt !== null ? 'primary' : 'danger'}
          >
            {record.deletedAt !== null ? 'UN DELETE' : 'DELETE'}
          </Button>
          <Divider type="vertical" />
          <Button
            // loading={deleteLoading === record
            onClick={() => {
              // ReactDOM.createPortal(
              //   <LocalizedModal />,
              //   document.getElementById('modal')
              // );
            }}
            type="primary"
          >
            EDIT
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        defaultExpandAllRows={true}
        tableLayout={'auto'}
        columns={columns}
        dataSource={users}
        pagination={false}
        loading={loading}
      />
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={totalCount}
        pageSize={count}
        onChange={onChange}
      />
    </div>
  );
}

export default observer(FetchUsers);
