import moment from 'moment';
import { get } from '../api/client';
import { getCookie } from '../api/session';
import { types } from '../types/types';

// eslint-disable-next-line import/prefer-default-export
export const isLoading = (loading) => {
  return {
    type: types.loader,
    isLoading: loading,
  };
};

export const saveCvData = (cvData) => {
  return {
    type: types.cvDataToPrint,
    cvData,
  };
};

export const openToastData = (data) => {
  return {
    type: types.openToast,
    data,
  };
};

export const openAlertData = (data) => {
  return {
    type: types.openAlert,
    data,
  };
};

export const closeAlertData = (data) => {
  return {
    type: types.closeAlert,
    data,
  };
};

export const closeCalendarToast = () => {
  return {
    type: types.closeCalendarToast,
  };
};

export const openCalendarToast = () => {
  return {
    type: types.openCalendarToast,
  };
};

export const createSocketIo = (socket) => {
  return {
    type: types.socketIo,
    socket,
  };
};

export const setNotificationData = (data) => {
  return {
    type: types.notificationData,
    data,
  };
};

export const setTodayReminders = (reminders) => {
  return {
    type: types.todayReminders,
    data: reminders,
    count: reminders.length,
  };
};

export const getTodayReminder = () => {
  return async (dispatch) => {
    const idSession = getCookie('_idsession');
    const user = getCookie('_fe');//JSON.parse();
    await get(`/generals/v1/getTodayReminder/${user.id_user}`, idSession)
      .then((data) => {
        const newArray = [];
        data.schedule?.map((item) => {
          newArray.push({ ...item, start: moment(item.start).toDate(), end: moment(item.start).toDate() });
        });
        dispatch(setTodayReminders(newArray));
      })
      .catch((e) => {});
  };
};

export const setConfirmModalData = (data) => {
  return {
    type: types.confirmModalData,
    data,
  };
};
