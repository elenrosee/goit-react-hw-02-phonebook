import PropTypes from "prop-types";
import styles from "./Notification.module.scss";

const Notification = ({ message }) => (
  <h3 className={styles.title}>{message}</h3>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
