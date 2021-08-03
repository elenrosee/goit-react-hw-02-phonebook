import PropTypes from "prop-types";
import styles from "./ContactsList.module.scss";

const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.contact_list}>
    {contacts.map(({ name, number, id }) => (
      <li key={id} className={styles.contact_item}>
        <span>
          {name}: {number}
        </span>
        <button
          type="button"
          onClick={() => onDeleteContact(id)}
          className={styles.button}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
