export const getBoards = (pid) => {
  return fetch(`/api/projects/${pid}/boards`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}

export const getBoard = (pid, bid) => {
  return fetch(`/api/projects/${pid}/boards/${bid}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}