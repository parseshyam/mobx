/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';
import { Redirect, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import NavBar from 'components/NavBar/NavBar';
import Select from '../../components/select/Select';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Pagination,
  Button,
  Icon,
  Divider,
} from 'antd';
import Highlighter from 'react-highlight-words';

const EditableContext = React.createContext();

const EditableCell = props => {
  const getInput = () => {
    if (props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  const renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
};

const FetchPools = props => {
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
      editUser,
    },
    LoggedIn,
  } = useContext(rootStore);
  console.log(loading);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortData, setSortData] = useState([
    { sortBy: 'ASC', sortValue: 'id' },
  ]);
  const [loggedIn, setLoggedIn] = useState();

  let history = useHistory();
  useEffect(() => {
    if (!LoggedIn);
    const accessToken =
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken');
    if (!accessToken) history.push('/');
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    let body = {};
    body.sort = sortData;
    body.search = [];
    getUsers(page, count, body);
  }, [page, count, sortData]);

  useEffect(() => {
    setData(users);
  }, [users]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log(history);
    history.push('/');
  };

  const onChange = pageNumber => {
    setPage(pageNumber);
  };
  let searchInput = null;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
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
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
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

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleCount = count => {
    setCount(count);
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      ...getColumnSearchProps('id'),
      onFilter: (value, record) => record.id.includes(value),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      editable: true,
      ...getColumnSearchProps('firstName'),
      onFilter: (value, record) => record.firstName.includes(value),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
      onFilter: (value, record) => record.lastName.includes(value),
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
      key: 'deletedAt',
      title: 'deletedAt',
      dataIndex: 'deletedAt',
      editable: false,
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
        </span>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => save(form, record.id)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => cancel(record.id)}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record.id)}>
            Edit
          </a>
        );
      },
    },
  ];
  const isEditing = record => record.id === editingKey;
  const cancel = () => {
    setEditingKey('');
  };
  const save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      editUser(row, key);
      const newData = [...data];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    });
  };
  const edit = key => {
    setEditingKey(key);
  };
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  const _columns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <React.Fragment>
      <NavBar loggedin={loggedIn} logout={logout} />
      <div className="m-5">
        <div className="m-2">
          <Select handleOptChange={handleOptChange} />
        </div>
        <EditableContext.Provider value={props.form}>
          <Table
            components={components}
            bordered
            dataSource={data}
            columns={_columns}
            rowClassName="editable-row"
            pagination={false}
            loading={loading}
            defaultExpandAllRows={true}
          />
        </EditableContext.Provider>
        <div className="mt-4">
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={totalCount}
            pageSize={count}
            onChange={onChange}
          />
        </div>
        <div className="mt-3">
          SET LIMIT :{' '}
          <InputNumber
            min={5}
            max={30}
            defaultValue={5}
            onChange={handleCount}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
const FetchUsers = Form.create()(observer(FetchPools));
export default FetchUsers;
