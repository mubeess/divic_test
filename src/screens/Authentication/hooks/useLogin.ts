import axios from 'axios';

const useLogin = () => {
  const login = async data => {
    try {
      const response = await axios.post(
        'https://shippex-demo.bc.brandimic.com/api/method/login',
        data,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    login,
  };
};

export default useLogin;
