export function fetchLists(dispatch) {
  dispatch( (dispatch) => {
    dispatch(listActions.refreshStart())
    axios.get(`${apiHome}/lists`)
      .then( (data) => {
        dispatch(listActions.refreshFulfilled(data))
      })
      .catch( (err) => {
        dispatch(listActions.refreshErrored(err))
      })
  })
};
