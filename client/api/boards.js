export const getBoards = (pid) => {
  return fetch(`/api/projects/${pid}/boards`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err;
    })
}

export const getBoard = (pid, bid) => {
  return fetch(`/api/projects/${pid}/boards/${bid}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err;
    })
}

export const createBoard = (pid, params) => {
  return fetch(`/api/projects/${pid}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(response => response.json())
  .then(data => data)
  .catch(err => {
    throw err
  })
}