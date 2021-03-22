import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { StateContext } from '../store/ContextManagement';
import WithAudit from '../components/common/audit/index';

const STATUS = {
  IN: 'Checked In',
  OUT: 'Checked Out',
};

type PartsStatusType = 'Checked In' | 'Checked Out' | '';

const CreatePart: React.FC = () => {
  /* consts */
  const history = useHistory();
  const ID: string = uuidv4();
  const store = useContext(StateContext);

  /*  States */
  const [status, setStatus] = useState<PartsStatusType>('');
  const [name, setName] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);

  /* effects */
  useEffect(() => {
    setDisable(!(status.length > 0 && name.length > 0));
  }, [status, name]);

  /* handlers */
  const closeModal = () => {
    history.goBack();
  };

  const save = () => {
    /* dispatch */
    if (store) {
      store.addPart({
        id: ID,
        name,
        status,
      });
    }

    /* close the modal and return to the list page */
    closeModal();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>, value) =>
    setStatus(value);

  return (
    <Modal open data-id="createPartModal">
      <Modal.Header>
        <h3>Add Parts</h3>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field required>
            <label htmlFor="name">Part Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Part Name"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="status"> Part Status </label>
            <Form.Group inline id="status">
              <Form.Radio
                label="Checked In"
                value={STATUS.IN}
                checked={status === STATUS.IN}
                onChange={(e, { value }) => handleChange(e, value)}
              />

              <Form.Radio
                label="Checked Out"
                value={STATUS.OUT}
                checked={status === STATUS.OUT}
                onChange={(e, { value }) => handleChange(e, value)}
              />
            </Form.Group>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal}>Cancel</Button>
        <WithAudit
          dataid="createPartsButton"
          dataaudit={{
            desc: 'creating new Spare parts',
          }}
          type="click"
        >
          <Button onClick={save} primary disabled={disable}>
            Save
          </Button>
        </WithAudit>
      </Modal.Actions>
    </Modal>
  );
};

export default CreatePart;
