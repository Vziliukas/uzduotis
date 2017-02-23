import dispatcher from '../dispatcher';

export function loadMore(start, limit) {
  dispatcher.dispatch({
    type: "LOAD_MORE",
    start: start,
    limit: limit
  });
}

export function setFavourite(id) {
  dispatcher.dispatch({
    type: "FAVOURITE",
    id: id
  })
}
