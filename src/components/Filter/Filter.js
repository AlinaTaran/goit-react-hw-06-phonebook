import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/contacts-selectors';
import * as contactsActions from '../../redux/contact-actions';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <label>
      Find contact by name
      <input
        type="text"
        name="name"
        value={value}
        onChange={event =>
          dispatch(contactsActions.changeFilter(event.target.value))
        }
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
