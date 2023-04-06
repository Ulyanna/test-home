import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContactsList } from 'components/contactsList/ContactsList';
import { ContactForm } from 'components/contactForm/ContactForm';
import { Filter } from 'components/filter/Filter';
import { fetchContacts } from 'redux/operations';
import { selectLoading } from 'redux/selector';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactsList />
      <Filter />
    </>
  );
}
