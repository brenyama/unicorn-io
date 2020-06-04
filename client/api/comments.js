export const createComment = (pid, bid, params) => {
  return fetch(`/api/projects/${pid}/boards/${bid}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err;
    })
}

export const updateComment = (pid, bid, cid, params) => {
  return fetch(`/api/projects/${pid}/boards/${bid}/comments/${cid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err;
    })
}