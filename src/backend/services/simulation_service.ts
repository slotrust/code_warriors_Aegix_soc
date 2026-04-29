export interface BruteForceInput {
  target_service?: string;
  port?: number;
  source_ip?: string;
  duration?: string;
}

export interface BruteForceLog {
  timestamp: string;
  source_ip: string;
  username_attempted: string;
  result: "failed";
  port: number;
}

export interface BruteForceResult {
  attack_type: "Brute Force";
  mitre: "T1110";
  logs: BruteForceLog[];
  summary: {
    total_attempts: number;
    attempt_rate: string;
    target_account: string;
  };
  indicators: string[];
  recommended_action: "BLOCK_IP";
}

/**
 * Parse a human-readable duration string and return total seconds.
 * Supports "X minutes", "X seconds", "X hours".
 */
function parseDurationSeconds(duration: string): number {
  const lower = duration.toLowerCase().trim();
  const minuteMatch = lower.match(/^(\d+(?:\.\d+)?)\s*min/);
  if (minuteMatch) return parseFloat(minuteMatch[1]) * 60;
  const hourMatch = lower.match(/^(\d+(?:\.\d+)?)\s*h/);
  if (hourMatch) return parseFloat(hourMatch[1]) * 3600;
  const secMatch = lower.match(/^(\d+(?:\.\d+)?)\s*s/);
  if (secMatch) return parseFloat(secMatch[1]);
  // fallback: treat raw number as seconds
  const rawNum = parseFloat(lower);
  return isNaN(rawNum) ? 120 : rawNum;
}

/**
 * Generate a realistic sequence of inter-arrival gaps for brute-force attempts.
 * The rate accelerates over time: early attempts are slower, later ones are rapid.
 * Returns an array of millisecond offsets from the start.
 *
 * Formula: offset[i] = totalMs * (1 - (1 - i/(n-1))^exponent)
 *   With exponent > 1 the function is concave-then-steep, producing gaps that
 *   start large (slow) and shrink (fast) — an increasing attack rate.
 */
function generateAttemptOffsets(totalAttempts: number, totalMs: number): number[] {
  const exponent = 1.8;
  const offsets: number[] = [];
  for (let i = 0; i < totalAttempts; i++) {
    const t = i / (totalAttempts - 1 || 1);
    const fraction = 1 - Math.pow(1 - t, exponent);
    offsets.push(Math.round(fraction * totalMs));
  }
  return offsets;
}

/** Common passwords used in realistic brute-force campaigns. */
const COMMON_PASSWORDS = [
  "password", "123456", "admin", "admin123", "root", "toor", "qwerty",
  "letmein", "welcome", "monkey", "dragon", "master", "shadow", "pass123",
  "1234", "test", "guest", "changeme", "abc123", "P@ssw0rd",
];

/** Mix of usernames targeting privileged accounts plus generic ones. */
const USERNAME_POOL = [
  "admin", "root", "administrator", "ubuntu", "ec2-user", "oracle",
  "postgres", "user", "test", "guest", "deploy", "backup", "support",
];

export const simulationService = {
  /**
   * Simulate a brute-force SSH login attack and return the full structured report.
   */
  generateBruteForceAttack(input: BruteForceInput = {}): BruteForceResult {
    const targetService = input.target_service ?? "ssh";
    const port = input.port ?? 22;
    const sourceIp = input.source_ip ?? "203.0.113.45";
    const durationStr = input.duration ?? "2 minutes";
    const targetAccount = "admin";

    const durationSeconds = parseDurationSeconds(durationStr);
    const durationMs = durationSeconds * 1000;

    // Choose a realistic number of attempts (20–100)
    const totalAttempts = Math.floor(Math.random() * 81) + 20; // [20, 100]

    const startTime = new Date();
    const offsets = generateAttemptOffsets(totalAttempts, durationMs);

    const logs: BruteForceLog[] = offsets.map((offsetMs, idx) => {
      const ts = new Date(startTime.getTime() + offsetMs);

      // First 70 % of attempts target the privileged account; remainder spray others
      const usernameIdx = idx < Math.floor(totalAttempts * 0.7)
        ? 0 // "admin"
        : 1 + (idx % (USERNAME_POOL.length - 1));
      const username = USERNAME_POOL[usernameIdx] ?? targetAccount;

      return {
        timestamp: ts.toISOString(),
        source_ip: sourceIp,
        username_attempted: username,
        result: "failed",
        port,
      };
    });

    const attemptRatePerMin = (totalAttempts / (durationSeconds / 60)).toFixed(1);

    const indicators: string[] = [
      `High login failure rate: ${totalAttempts} failures in ${durationStr} (${attemptRatePerMin} attempts/min)`,
      `Repeated authentication attempts from a single IP: ${sourceIp}`,
      `Short time window with escalating attempt frequency`,
      `Repeated targeting of privileged account '${targetAccount}' on port ${port} (${targetService.toUpperCase()})`,
      `Common/dictionary passwords detected across attempts`,
    ];

    return {
      attack_type: "Brute Force",
      mitre: "T1110",
      logs,
      summary: {
        total_attempts: totalAttempts,
        attempt_rate: `${attemptRatePerMin} attempts/min`,
        target_account: targetAccount,
      },
      indicators,
      recommended_action: "BLOCK_IP",
    };
  },
};
