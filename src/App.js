import React, { Component } from "react";

import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactsList from "./components/ContactsList";
import Notification from "./components/Notification";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (data) => {
    const { contacts } = this.state;

    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...[data], ...prevState.contacts],
        };
      });
    }
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    return (
      <React.Fragment>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <React.Fragment>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ContactsList
              contacts={this.getVisibleContacts()}
              onDeleteContact={this.deleteContact}
            />
          </React.Fragment>
        ) : (
          <Notification message="Empty contacts list" />
        )}
      </React.Fragment>
    );
  }
}

export default App;
