import { Router } from "express";
import { simulationService, BruteForceResult } from "../services/simulation_service.js";
import { logService } from "../services/log_service.js";

const router = Router();

/** Persist a representative summary log entry so the SOC dashboard reflects the attack. */
async function persistSimulationLog(result: BruteForceResult): Promise<void> {
  const sourceIp = result.logs[0]?.source_ip ?? "203.0.113.45";
  await logService.processAndSaveLog({
    source_ip: sourceIp,
    event_type: "brute_force_simulation",
    username: result.summary.target_account,
    status_code: 401,
    payload: {
      attack_type: result.attack_type,
      mitre: result.mitre,
      total_attempts: result.summary.total_attempts,
      attempt_rate: result.summary.attempt_rate,
      indicators: result.indicators,
      recommended_action: result.recommended_action,
    },
  });
}

/**
 * POST /api/simulation/brute-force
 *
 * Simulate a brute-force login attack in the controlled demo environment.
 *
 * Request body (all fields optional):
 *   target_service  – e.g. "ssh" (default: "ssh")
 *   port            – e.g. 22    (default: 22)
 *   source_ip       – e.g. "203.0.113.45" (default: "203.0.113.45")
 *   duration        – e.g. "2 minutes"    (default: "2 minutes")
 *
 * Returns the structured attack report as strict JSON.
 */
router.post("/brute-force", async (req, res) => {
  try {
    const { target_service, port, source_ip, duration } = req.body ?? {};

    const result = simulationService.generateBruteForceAttack({
      target_service,
      port: port !== undefined ? Number(port) : undefined,
      source_ip,
      duration,
    });

    await persistSimulationLog(result);
    res.json(result);
  } catch (error) {
    console.error("Error in POST /api/simulation/brute-force:", error);
    res.status(500).json({ error: "Failed to generate brute-force simulation" });
  }
});

/**
 * GET /api/simulation/brute-force
 *
 * Same as POST but uses default parameters — convenient for quick demos.
 */
router.get("/brute-force", async (_req, res) => {
  try {
    const result = simulationService.generateBruteForceAttack();
    await persistSimulationLog(result);
    res.json(result);
  } catch (error) {
    console.error("Error in GET /api/simulation/brute-force:", error);
    res.status(500).json({ error: "Failed to generate brute-force simulation" });
  }
});

export default router;
