import React, { useContext, useState, useEffect } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import {
  Pagination,
  Table,
  Divider,
  Button,
  Input,
  Icon,
  InputNumber,
  Popconfirm,
  Form,
} from 'antd';
import Highlighter from 'react-highlight-words';
import Select from '../../components/select/Select';
import Modal from 'components/modal/Modal';

const FetchUsers = props => {
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
  const [data, setData] = useState(users);
  const [editingKey, setEditingKey] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [showModal, changeShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sortData, setSortData] = useState([
    {
      sortBy: 'ASC',
      sortValue: 'id',
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    console.log('sortData', sortData);
    let body = {};
    body.sort = sortData;
    body.search = [];
    getUsers(page, count, body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, count, sortData]);

  useEffect(() => {
    setData(users);
  }, [users]);
  console.log(toJS(users));
  ///////

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchedColumn]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  ///////
  const onChange = pageNumber => {
    setPage(pageNumber);
  };

  const handleOptChange = (value = []) => {
    let array = [];
    if (value.length <= 0) {
      setSortData([
        {
          sortBy: 'ASC',
          sortValue: 'id',
        },
      ]);
    } else {
      value.map(val => {
        return array.push(JSON.parse(val));
      });
      setSortData(array);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
      filterMultiple: true,
      editable: true,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ['descend', 'ascend'],
      editable: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ['descend', 'ascend'],
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
      editable: true,
    },
    {
      title: 'Notification',
      dataIndex: 'notificationsOnOff',
      key: 'notificationsOnOff',
      ...getColumnSearchProps('notificationsOnOff'),
      editable: true,
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      ...getColumnSearchProps('about'),
      editable: true,
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
      ...getColumnSearchProps('profilePicture'),
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
              // console.log(record);
              // const id = record.id;
              // console.log(id);
              setModalData(record);
              changeShowModal(!showModal);
            }}
            type="primary"
          >
            EDIT
          </Button>
          <Modal
            data={modalData}
            visible={showModal}
            changeModal={() => changeShowModal(!showModal)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-3">
        <div id="modal"></div>
        <Select handleOptChange={handleOptChange} />
      </div>
      <Table
        key="unique"
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
      <InputNumber min={5} max={30} defaultValue={5} onChange={onChange} />
    </div>
  );
};
export default observer(FetchUsers);
