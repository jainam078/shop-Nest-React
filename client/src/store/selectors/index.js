import { createSelector } from 'reselect';

const getUserDataObject = (state) => state.userData;

export const userDataSelector = createSelector([getUserDataObject], (userData) => userData);
