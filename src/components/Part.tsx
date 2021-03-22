import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { StateContext } from '../store/ContextManagement';

import { PartsInterface } from '../assets/definition/Type.definition';

const Table_COLS_NAME = {
  ID: 'Part ID',
  NAME: 'Part Name',
  STATUS: 'Part Status',
};

// interface Parts {
//   id: string;
//   name: string;
//   status: string;
// }

const Part: React.FC = (props) => {
  const store = useContext(StateContext);
  const [tableData, setTableData] = useState<PartsInterface[]>([]);
  const exampleReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_SORT': {
        let currState = { ...state };
        if (state.column === action.column) {
          currState = {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        } else {
          currState = {
            ...state,
            data: state.data,
            direction: 'ascending',
            column: action.column,
          };
        }

        return currState;
      }
      case 'UPDATE_TABLE': {
        return {
          ...state,
          data: tableData,
        };
      }

      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });

  const { column, data, direction } = state;

  useEffect(() => {
    if (store?.partsList) {
      setTableData(store.partsList.slice().reverse());
    }
  }, [store]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_TABLE', data: tableData });
  }, [tableData]);

  return (
    <div style={{ width: '100%' }}>
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === Table_COLS_NAME.ID ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: Table_COLS_NAME.ID })
              }
            >
              {Table_COLS_NAME.ID}
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === Table_COLS_NAME.NAME ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: Table_COLS_NAME.NAME })
              }
            >
              {Table_COLS_NAME.NAME}
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === Table_COLS_NAME.STATUS ? direction : null}
              onClick={() =>
                dispatch({
                  type: 'CHANGE_SORT',
                  column: Table_COLS_NAME.STATUS,
                })
              }
            >
              {Table_COLS_NAME.STATUS}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ id, name, status }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {data.length <= 0 && (
        <p
          style={{
            verticalAlign: 'center',
            textAlign: 'center',
          }}
        >
          No parts to show. Please add.
        </p>
      )}
    </div>
  );
};

export default Part;
