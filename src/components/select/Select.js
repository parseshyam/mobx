import { TreeSelect } from 'antd';
import React from 'react';
const { TreeNode } = TreeSelect;

export default class Demo extends React.Component {
  state = {
    value: null,
  };

  onChange = value => {
    this.setState(
      {
        value: value,
      },
      () => {
        this.props.handleOptChange(this.state.value);
      }
    );
  };

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select sorting values"
        allowClear
        multiple
        treeDefaultExpandAll={false}
        onChange={this.onChange}
      >
        <TreeNode disabled value="null_1" title="SORT BY ID" key="aa">
          <TreeNode
            value={JSON.stringify({ sortBy: 'DESC', sortValue: 'id' })}
            title="ID-DESCENDING"
            key="aaa"
          />
          <TreeNode
            value={JSON.stringify({ sortBy: 'ASC', sortValue: 'id' })}
            title="ID-ASCENDING"
            key="aab"
          />
        </TreeNode>

        <TreeNode disabled value="null_2" title="SORT BY FIRST NAME" key="bb">
          <TreeNode
            value={JSON.stringify({ sortBy: 'DESC', sortValue: 'firstName' })}
            title="FN-DESCENDING"
            key="bba"
          />
          <TreeNode
            value={JSON.stringify({ sortBy: 'ASC', sortValue: 'firstName' })}
            title="FN-ASCENDING"
            key="bbc"
          />
        </TreeNode>

        <TreeNode disabled value="null_3" title="SORT BY LAST NAME" key="cc">
          <TreeNode
            value={JSON.stringify({ sortBy: 'DESC', sortValue: 'lastName' })}
            title="LN-DESCENDING"
            key="cca"
          />
          <TreeNode
            value={JSON.stringify({ sortBy: 'ASC', sortValue: 'lastName' })}
            title="LN-ASCENDING"
            key="ccb"
          />
        </TreeNode>

        <TreeNode disabled value="null_4" title="SORT BY FIRST EMAIL" key="dd">
          <TreeNode
            value={JSON.stringify({ sortBy: 'DESC', sortValue: 'email' })}
            title="E-DESCENDING"
            key="dda"
          />
          <TreeNode
            value={JSON.stringify({ sortBy: 'ASC', sortValue: 'email' })}
            title="E-ASCENDING"
            key="ddb"
          />
        </TreeNode>

        <TreeNode disabled value="null_5" title="SORT BY FIRST PHONE" key="ee">
          <TreeNode
            value={JSON.stringify({
              sortBy: 'DESC',
              sortValue: 'phoneNumber',
            })}
            title="P-DESCENDING"
            key="eea"
          />
          <TreeNode
            value={JSON.stringify({
              sortBy: 'ASC',
              sortValue: 'phoneNumber',
            })}
            title="P-ASCENDING"
            key="eeb"
          />
        </TreeNode>
      </TreeSelect>
    );
  }
}
