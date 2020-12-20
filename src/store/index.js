import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/auth';
import chatReducer from 'store/chat';

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
