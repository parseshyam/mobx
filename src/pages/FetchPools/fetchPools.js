import React, { useContext, useState, useEffect } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
import NavBar from 'components/NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import Select from '../../components/select/PoolsSortSelect';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Pagination,
  Button,
  Icon,
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
    PoolsStore: {
      loading,
      pools,
      getPools,
      totalCount,
      updatePool,
      deleteLoading,
      deletePool,
      unDeletePool,
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
  const [loggedIn, setLoggedIn] = useState();
  const [sortData, setSortData] = useState([
    { sortBy: 'ASC', sortValue: 'id' },
  ]);
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
    getPools(page, count, body);
  }, [page, count, sortData]);

  useEffect(() => {
    setData(pools);
  }, [pools]);

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

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log(history);
    history.push('/');
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

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleCount = count => {
    setCount(count);
  };
  const columns = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      editable: false,
      ...getColumnSearchProps('id'),
      onFilter: (value, record) => record.id.includes(value),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: true,
      key: 'address',
      ...getColumnSearchProps('address'),
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'categoryId',
      title: 'categoryId',
      dataIndex: 'categoryId',
      editable: true,
    },
    {
      key: 'contactEmail',
      title: 'contactEmail',
      dataIndex: 'contactEmail',
      editable: true,
      ...getColumnSearchProps('contactEmail'),
      onFilter: (value, record) => record.contactEmail.includes(value),
      sorter: (a, b) => a.address.contactEmail - b.contactEmail.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'contactName',
      title: 'contactName',
      dataIndex: 'contactName',
      editable: true,
      ...getColumnSearchProps('contactName'),
      onFilter: (value, record) => record.contactName.includes(value),
      sorter: (a, b) => a.contactName.length - b.contactName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'contactPhone',
      title: 'contactPhone',
      dataIndex: 'contactPhone',
      editable: true,
      ...getColumnSearchProps('contactPhone'),
      onFilter: (value, record) => record.contactPhone.includes(value),
      sorter: (a, b) => a.contactPhone.length - b.contactPhone.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'createdAt',
      title: 'createdAt',
      dataIndex: 'createdAt',
      editable: false,
    },
    {
      key: 'deletedAt',
      title: 'deletedAt',
      dataIndex: 'deletedAt',
      editable: false,
    },
    {
      key: 'description',
      title: 'description',
      dataIndex: 'description',
      editable: true,
      ...getColumnSearchProps('description'),
      onFilter: (value, record) => record.description.includes(value),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'location',
      title: 'location',
      dataIndex: 'location',
      editable: true,
    },
    {
      key: 'poolName',
      title: 'poolName',
      dataIndex: 'poolName',
      editable: true,
      ...getColumnSearchProps('poolName'),
      onFilter: (value, record) => record.poolName.includes(value),
      sorter: (a, b) => a.poolName.length - b.poolName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {console.log(123, deleteLoading === record.id)}
          <Button
            loading={deleteLoading === record.id}
            onClick={() => {
              record.deletedAt !== null
                ? unDeletePool(record.id)
                : deletePool(record.id);
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
      updatePool(row, key);
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
      {/* handleOptChange={handleOptChange} */}
      <NavBar loggedin={loggedIn} logout={logout} />
      {/* {auth ? null : <Redirect to="/login" />} */}
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
const EditableFormTable = Form.create()(observer(FetchPools));

export default EditableFormTable;
