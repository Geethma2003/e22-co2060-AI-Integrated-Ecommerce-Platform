/**
 * N8N Router
 * API endpoints for managing N8N workflows from the main platform
 */

import express from "express";
import * as n8nController from "../controllers/n8nController.js";

const router = express.Router();

// Status endpoints
router.get("/status", n8nController.getN8NStatus);
router.get("/dashboard", n8nController.getN8NDashboard);

// Workflow management
router.get("/workflows", n8nController.getWorkflows);
router.get("/workflows/:id", n8nController.getWorkflow);
router.post("/workflows/:id/trigger", n8nController.triggerWorkflow);
router.patch("/workflows/:id/status", n8nController.setWorkflowStatus);

// Execution management
router.get("/workflows/:id/executions", n8nController.getExecutionHistory);
router.get("/executions/:id", n8nController.getExecution);

// Webhook endpoints
router.post("/webhook/:path", n8nController.triggerWebhook);

// Product social media endpoints
router.post("/products/:id/social-media", n8nController.triggerProductSocialMedia);
router.post("/products/:id/facebook", n8nController.triggerProductFacebook);
router.post("/products/:id/instagram", n8nController.triggerProductInstagram);
router.post("/products/:id/tiktok", n8nController.triggerProductTikTok);

export default router;
