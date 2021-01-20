import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/contacts-selectors';
import * as contactsActions from '../../redux/contact-actions';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const isExistName = existName => {
    const nameNormalized = existName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === nameNormalized);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const sameName = isExistName(name);
    const contact = { id: uuidv4(), name, number };

    if (sameName) {
      alert(`${name} is already in your phonebook`);
    } else {
      dispatch(contactsActions.addContact(contact));
    }

    if (contact === '') {
      return alert('Enter contact');
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          name="name"
          value={name}
          type="text"
          onChange={handleChange}
        />
      </label>

      <label>
        Number
        <input
          className={s.input}
          name="number"
          type="tel"
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className={s.button} type="submit">
        Add to contact
      </button>
    </form>
  );
}

export default ContactForm;
