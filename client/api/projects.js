// export const getProjects = async () => {
//   const response = await fetch('/api/projects');

//   if (response.status === 200) {
//     const projects = await response.json();
//     return projects;
//   }

//   const json_error = await response.json();
//   const err = new Error(json_error.message);
//   err.status = response.status;
//   throw err
// }

export const getProjects = () => {
  return fetch('/api/projects')
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}