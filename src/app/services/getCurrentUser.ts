export default function getCurrentUser() {
  let tmpUser = sessionStorage.getItem('currentUser');
  if (tmpUser != null) return JSON.parse(tmpUser);
  else return null;
}
