import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/verify/${token}`);
        console.log(token)
        if (response.data.message === "Invalid Token") {
          setVerificationStatus('Invalid Token');
          toast.error('Invalid Token');
        } else {
          setVerificationStatus('Verification successful');
          toast.success('Verification successful');
          setTimeout(() => navigate('/login'), 2000); // delay navigation for better UX
        }
      } catch (error) {
        console.error('Error verifying token:', error.response?.data || error.message);
        setVerificationStatus('Error verifying token');
        toast.error(`Error verifying token: ${error.response?.data.message || error.message}`);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <h2>{verificationStatus}</h2>
    </div>
  );
};

export default VerifyAccount;
