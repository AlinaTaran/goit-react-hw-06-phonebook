import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import * as contactsActions from '../../redux/contact-actions';
import { filteredContacts } from '../../redux/contacts-selectors';

const ContactsList = () => {
  const contacts = useSelector(filteredContacts);
  const dispatch = useDispatch();

  const deleteContact = id => dispatch(contactsActions.deleteContact(id));

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          deleteContact={() => deleteContact(id)}
        />
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactsList;
