class Session {
  constructor(id, userId, loginTimestamp, logoutTimestamp) {
    this.id = id;
    this.userId = userId;
    this.loginTimestamp = loginTimestamp;
    this.logoutTimestamp = logoutTimestamp;
  }
}

export default Session;
