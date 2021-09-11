import { toast } from 'react-toastify';

export const notifyError = (errorMsg, options) => {
    errorMsg = errorMsg || 'Something went wrong!';
    toast.error(errorMsg.toString(), options);
}
