import React, { useEffect, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import axiosInstance from '../../../../services/api';
import CustomModal from '../../../../components/molecules/CustomModal/CustomModal';
import { MODALS } from '../../../../shared/Constant';
import Loader from '../../../../components/atoms/Loader/Loader';
import SearchInput from '../../../../components/atoms/SearchInput/SearchInput';
import { debounce } from '../../../../shared/Untils';
import CheckBoxField from '../../../../components/atoms/CheckBox/CheckBoxField';

function ContactsModal({ modalType, onClose }) {
  const [contactList, setContactList] = useState({
    contacts_ids: [],
    contacts : [] ,
  });
  const [contactsDetail, setContactsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageMeta, setPageMeta] = useState({
    currentPage: 1,
    total: 0,
  });
  const[showEvenContactIds, setShowEvenContactIds] = useState(false)
  const DATA_PER_PAGE = 20;

  const getContacts = (search) => {
    
    const query = {
      page: pageMeta.currentPage,
      companyId: 171,
      noGroupDuplicates: 1,
    };
    if (modalType === MODALS.MODAL_B) {
      query.countryId = 226;
    }
    if (search) {
      query.query = search;
    }
    
    axiosInstance
      .get('https://demo6078420.mockable.io/contact.json', {
        params: query,
      })
      .then((response) => {
        setContactList((prev)=> ({contacts_ids: [...prev.contacts_ids, ...response?.data?.contacts_ids], contacts: {...prev?.contacts, ...response?.data?.contacts}}));
        setPageMeta((prev) => ({
          currentPage: prev.currentPage++,
          total: response.data.total,
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isOpen = useMemo(
    () => [MODALS.MODAL_A, MODALS.MODAL_B].includes(modalType),
    [modalType]
  );

  const openDetailsModal = (contact) => {
    setContactsDetail(contact);
  };

  const closeDetailsModal = () => {
    setContactsDetail(null);
  };

  useEffect(() => {
    if (modalType) {
      setLoading(true);
      getContacts();
    }
  }, [modalType]);



  const handleSearchQuery = useMemo(() => debounce((e) => {
    getContacts(e.target.value);
  }, 1000), []);

  const searchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearchQuery(e);
  };

  const hasMoreData = ()=>{
    return (pageMeta.currentPage != pageMeta.total / DATA_PER_PAGE)
  }

  const loadMoreData = () => {
    if (loading || !hasMoreData()) return;
    getContacts()
  };

  const handleScroll = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreData();
    }
  };

  const handleShowEven = (e)=>{
    const value = e.target.checked;
    setShowEvenContactIds(value);
  }
  const getFilteredData = ()=> {
    if (showEvenContactIds) {
      return [...contactList.contacts_ids].filter(item => item % 2 === 0) || [];
    }
    else {
      return [...contactList?.contacts_ids]
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (contactsDetail) {
    return (
      <CustomModal open={true} handleClose={closeDetailsModal}>
        <div>
          <label>Email:</label> <span>{contactsDetail.email}</span>
          <label>Phone:</label> <span>{contactsDetail.full_phone_number}</span>
          <label>Phone:</label> <span>{contactsDetail.country.iso}</span>
        </div>
      </CustomModal>
    );
  }


  return (
    <CustomModal open={isOpen} handleClose={onClose}>
      <SearchInput
        value={searchQuery}
        onChange={searchChange}
        enterKeyHandler={(e) => {
          handleSearchQuery.cancel()
          getContacts(e.target.value);
        }}
      />
      <Scrollbars style={{ height: '400px' }} onScrollFrame={handleScroll}>
        <ul className="list-group">
        {getFilteredData()?.map((contactId) => {
        return (
          <li key={contactId}
          onClick={() => openDetailsModal(contactList.contacts[contactId])} className="list-group-item d-flex justify-content-between align-items-center">
            <label>Email:</label>{' '}
            <span>{contactList.contacts[contactId].email}</span>
            <label>Phone:</label>{' '}
            <span>{contactList.contacts[contactId].full_phone_number}</span>
            <label>Phone:</label>{' '}
            <span>{contactList.contacts[contactId].country.iso}</span>
        </li>
        );
        
      })}
      </ul>
      </Scrollbars>
      <CheckBoxField 
        onChange={handleShowEven}
        id="checkbox"
        checked = {showEvenContactIds}
      />
        

    </CustomModal>
  );
}

export default ContactsModal;
