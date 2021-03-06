
export const getProjects = () => {
  return fetch('/api/projects')
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err;
    })
}

export const createProject = (params) => {
  return fetch('/api/projects', {
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

export const deleteProject = (pid) => {
  return fetch(`/api/projects/${pid}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err
    })
}

export const getProject = (pid) => {
  return fetch(`/api/projects/${pid}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      throw err
    })
}