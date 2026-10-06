declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    TASK_AGENT_ADMIN_EXTERNAL_USER_IDS?: string;
  }
}
