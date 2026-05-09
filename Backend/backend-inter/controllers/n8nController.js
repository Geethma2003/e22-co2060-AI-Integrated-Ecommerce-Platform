/**
 * N8N Controller
 * Routes for managing N8N workflows from the main platform
 */

import * as n8nService from "../services/n8nService.js";

/**
 * GET /api/n8n/status
 * Get N8N connection status
 */
export async function getN8NStatus(req, res) {
  try {
    const status = await n8nService.getN8NStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      message: "Failed to check N8N status",
      error: error.message
    });
  }
}

/**
 * GET /api/n8n/dashboard
 * Get N8N dashboard information
 */
export async function getN8NDashboard(req, res) {
  try {
    const info = await n8nService.getN8NDashboardInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch N8N dashboard info",
      error: error.message
    });
  }
}

/**
 * GET /api/n8n/workflows
 * Get all workflows
 */
export async function getWorkflows(req, res) {
  try {
    const workflows = await n8nService.getWorkflows();
    res.json({
      count: workflows.length,
      workflows: workflows
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workflows",
      error: error.message
    });
  }
}

/**
 * GET /api/n8n/workflows/:id
 * Get specific workflow
 */
export async function getWorkflow(req, res) {
  try {
    const { id } = req.params;
    const workflow = await n8nService.getWorkflow(id);
    res.json(workflow);
  } catch (error) {
    res.status(404).json({
      message: "Workflow not found",
      error: error.message
    });
  }
}

/**
 * POST /api/n8n/workflows/:id/trigger
 * Trigger a workflow
 */
export async function triggerWorkflow(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const result = await n8nService.triggerWorkflow(id, data);
    res.json({
      message: "Workflow triggered successfully",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger workflow",
      error: error.message
    });
  }
}

/**
 * GET /api/n8n/workflows/:id/executions
 * Get workflow execution history
 */
export async function getExecutionHistory(req, res) {
  try {
    const { id } = req.params;
    const { limit = 10 } = req.query;

    const executions = await n8nService.getExecutionHistory(id, parseInt(limit));
    res.json({
      workflowId: id,
      count: executions.length,
      executions: executions
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch execution history",
      error: error.message
    });
  }
}

/**
 * GET /api/n8n/executions/:id
 * Get specific execution details
 */
export async function getExecution(req, res) {
  try {
    const { id } = req.params;
    const execution = await n8nService.getExecution(id);
    res.json(execution);
  } catch (error) {
    res.status(404).json({
      message: "Execution not found",
      error: error.message
    });
  }
}

/**
 * PATCH /api/n8n/workflows/:id/status
 * Enable or disable a workflow
 */
export async function setWorkflowStatus(req, res) {
  try {
    const { id } = req.params;
    const { active } = req.body;

    if (typeof active !== "boolean") {
      return res.status(400).json({
        message: "Invalid request. 'active' must be a boolean"
      });
    }

    const result = await n8nService.setWorkflowStatus(id, active);
    res.json({
      message: `Workflow ${active ? "enabled" : "disabled"}`,
      workflow: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update workflow status",
      error: error.message
    });
  }
}

/**
 * POST /api/n8n/webhook/:path
 * Trigger workflow via webhook
 */
export async function triggerWebhook(req, res) {
  try {
    const { path } = req.params;
    const data = req.body;

    const result = await n8nService.triggerViaWebhook(path, data);
    res.json({
      message: "Webhook triggered successfully",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger webhook",
      error: error.message
    });
  }
}

/**
 * POST /api/products/:id/social-media
 * Trigger all social media workflows for a product
 */
export async function triggerProductSocialMedia(req, res) {
  try {
    const { id } = req.params;
    const { productName, description, image, category, tags, brand } = req.body;

    if (!productName || !image) {
      return res.status(400).json({
        message: "Product name and image are required"
      });
    }

    const product = {
      productName,
      description,
      image,
      category,
      tags,
      brand
    };

    const results = await n8nService.triggerAllSocialMediaWorkflows(product);
    res.json({
      message: "Social media workflows triggered",
      results: results
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger social media workflows",
      error: error.message
    });
  }
}

/**
 * POST /api/products/:id/facebook
 * Trigger Facebook posting for a product
 */
export async function triggerProductFacebook(req, res) {
  try {
    const { id } = req.params;
    const { productName, description, image, category, brand } = req.body;

    if (!productName || !image) {
      return res.status(400).json({
        message: "Product name and image are required"
      });
    }

    const product = { productName, description, image, category, brand };
    const result = await n8nService.triggerFacebookPostingWorkflow(product);

    res.json({
      message: "Facebook workflow triggered",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger Facebook workflow",
      error: error.message
    });
  }
}

/**
 * POST /api/products/:id/instagram
 * Trigger Instagram posting for a product
 */
export async function triggerProductInstagram(req, res) {
  try {
    const { id } = req.params;
    const { productName, description, image, tags } = req.body;

    if (!productName || !image) {
      return res.status(400).json({
        message: "Product name and image are required"
      });
    }

    const product = { productName, description, image, tags };
    const result = await n8nService.triggerInstagramPostingWorkflow(product);

    res.json({
      message: "Instagram workflow triggered",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger Instagram workflow",
      error: error.message
    });
  }
}

/**
 * POST /api/products/:id/tiktok
 * Trigger TikTok posting for a product
 */
export async function triggerProductTikTok(req, res) {
  try {
    const { id } = req.params;
    const { productName, description, image, tags } = req.body;

    if (!productName || !image) {
      return res.status(400).json({
        message: "Product name and image are required"
      });
    }

    const product = { productName, description, image, tags };
    const result = await n8nService.triggerTikTokPostingWorkflow(product);

    res.json({
      message: "TikTok workflow triggered",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to trigger TikTok workflow",
      error: error.message
    });
  }
}

export default {
  getN8NStatus,
  getN8NDashboard,
  getWorkflows,
  getWorkflow,
  triggerWorkflow,
  getExecutionHistory,
  getExecution,
  setWorkflowStatus,
  triggerWebhook,
  triggerProductSocialMedia,
  triggerProductFacebook,
  triggerProductInstagram,
  triggerProductTikTok
};
