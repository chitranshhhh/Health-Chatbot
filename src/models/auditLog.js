class AuditLog {
  constructor(id, userId, actionType, actionDetails, timestamp) {
    this.id = id;
    this.userId = userId;
    this.actionType = actionType;
    this.actionDetails = actionDetails;
    this.timestamp = timestamp;
  }
}

export default AuditLog;
