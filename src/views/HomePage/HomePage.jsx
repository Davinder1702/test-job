import Button from '../../components/atoms/Button';
import ContactsModal from './components/ContactsModal';
import { MODALS } from '../../shared/Constant';
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const { modalId } = useParams();

  const onClose = () => {
    navigate('/');
  };

  return (
    <>
      <Button size="small" onClick={() => navigate(`/${MODALS.MODAL_A}`)}>
        All Contacts
      </Button>
      <Button onClick={() => navigate(`/${MODALS.MODAL_B}`)}>
        US Contacts
      </Button>
      {modalId && <ContactsModal modalType={modalId} onClose={onClose} />}
    </>
  );
}

export default HomePage;
