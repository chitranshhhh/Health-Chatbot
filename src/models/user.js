class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // In a real application, ensure to hash passwords
  }
}

export default User;
