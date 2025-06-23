import { Pool } from 'pg'; // Only for backend use

// Initialize PostgreSQL connection pool
const pool = new Pool({ 
  connectionString: process.env.VITE_DATABASE_URL,

  ssl: {
    rejectUnauthorized: false // Important for some hosted PostgreSQL services
  }
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// User-related database operations
export const userDb = {
  async findUserByEmail(email: string) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },

  async createUser(name: string, email: string, hashedPassword: string) {
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );
      
      // Log the signup in the audit log
      await this.logUserAction(result.rows[0].id, 'SIGNUP', 'User account created');
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async validateCredentials(email: string, password: string) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error validating credentials:', error);
      throw error;
    }
  },
  
  async logUserLogin(userId: number, ipAddress: string = '', userAgent: string = '') {
    try {
      await pool.query(
        'INSERT INTO user_sessions (user_id, ip_address, user_agent) VALUES ($1, $2, $3)',
        [userId, ipAddress, userAgent]
      );
      
      await this.logUserAction(userId, 'LOGIN', 'User logged in');
      
      return true;
    } catch (error) {
      console.error('Error logging user login:', error);
      return false;
    }
  },
  
  async logUserLogout(userId: number) {
    try {
      await pool.query(
        `UPDATE user_sessions 
         SET logout_timestamp = NOW() 
         WHERE user_id = $1 AND logout_timestamp IS NULL
         ORDER BY login_timestamp DESC LIMIT 1`,
        [userId]
      );
      
      await this.logUserAction(userId, 'LOGOUT', 'User logged out');
      
      return true;
    } catch (error) {
      console.error('Error logging user logout:', error);
      return false;
    }
  },
  
  async logUserAction(userId: number, actionType: string, actionDetails: string, ipAddress: string = '') {
    try {
      await pool.query(
        'INSERT INTO audit_log (user_id, action_type, action_details, ip_address) VALUES ($1, $2, $3, $4)',
        [userId, actionType, actionDetails, ipAddress]
      );
      return true;
    } catch (error) {
      console.error('Error logging user action:', error);
      return false;
    }
  },
  
  async getUserSessions(userId: number, limit: number = 10) {
    try {
      const result = await pool.query(
        `SELECT * FROM user_sessions 
         WHERE user_id = $1 
         ORDER BY login_timestamp DESC 
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
  },
  
  async getAuditLog(userId: number, limit: number = 20) {
    try {
      const result = await pool.query(
        `SELECT * FROM audit_log 
         WHERE user_id = $1 
         ORDER BY timestamp DESC 
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting audit log:', error);
      return [];
    }
  }
};

export default pool;
