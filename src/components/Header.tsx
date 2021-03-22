import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react';

const Header: React.FC = () => {
  const history = useHistory();

  const createParts = () => {
    history.push('create', {
      /* This attribute determines if page reload is required on route change. Refer routes.tsx  */
      modal: true,
    });
  };
  return (
    <Grid.Row textAlign="left" verticalAlign="middle">
      <Grid.Column width={12}>
        {' '}
        <h4>Welcome to Spares Inventory </h4>
      </Grid.Column>
      <Grid.Column floated="right" width={2}>
        <Button primary floated="right" title="Add Parts" onClick={createParts}>
          Add Parts
        </Button>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Header;
