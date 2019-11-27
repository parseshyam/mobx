import React, { useContext, useState, useEffect } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
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
// address
// categoryId
// contactEmail
// contactName
// contactPhone
// createdAt
// deletedAt
// description
// id
// location
// pictures
// poolName
// updatedAt

const FetchPools = props => {
  const {
    PoolsStore: { loading, pools, getPools, totalCount, updatePool },
  } = useContext(rootStore);
  console.log(loading);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  useEffect(() => {
    getPools(page, count, {});
  }, [page, count]);

  useEffect(() => {
    setData(pools);
  }, [pools]);

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
      onFilter: (value, record) => record.address.includes(value),
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
      onFilter: (value, record) => record.contactEmail.includes(value),
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
      onFilter: (value, record) => record.contactName.includes(value),
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
      onFilter: (value, record) => record.contactPhone.includes(value),
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
      onFilter: (value, record) => record.description.includes(value),
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
      onFilter: (value, record) => record.poolName.includes(value),
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
    <div className="m-5">
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
      di
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
        <InputNumber min={5} max={30} defaultValue={5} onChange={handleCount} />
      </div>
    </div>
  );
};
const EditableFormTable = Form.create()(observer(FetchPools));

export default EditableFormTable;
