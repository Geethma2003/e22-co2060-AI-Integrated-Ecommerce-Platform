/**
 * N8N Workflow Service
 * Manages all N8N workflow interactions from the main platform
 * Handles: triggering, monitoring, configuration, and management
 */

const N8N_BASE_URL = process.env.N8N_API_URL || "http://localhost:5678";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook";

/**
 * Get all N8N workflows
 * @returns {Promise<Array>} List of workflows
 */
export async function getWorkflows() {
  try {
    const response = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
      method: "GET",
      headers: {
        "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
      }
    });

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch N8N workflows:", error.message);
    throw error;
  }
}

/**
 * Get specific workflow details
 * @param {string} workflowId - N8N workflow ID
 * @returns {Promise<Object>} Workflow details
 */
export async function getWorkflow(workflowId) {
  try {
    const response = await fetch(`${N8N_BASE_URL}/api/v1/workflows/${workflowId}`, {
      method: "GET",
      headers: {
        "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
      }
    });

    if (!response.ok) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Failed to fetch workflow:", error.message);
    throw error;
  }
}

/**
 * Trigger a workflow execution
 * @param {string} workflowId - N8N workflow ID
 * @param {Object} data - Data to send to workflow
 * @returns {Promise<Object>} Execution result
 */
export async function triggerWorkflow(workflowId, data = {}) {
  try {
    const response = await fetch(`${N8N_BASE_URL}/api/v1/workflows/${workflowId}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
      },
      body: JSON.stringify({
        data: data
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to trigger workflow");
    }

    const result = await response.json();
    console.log(`✅ Workflow ${workflowId} triggered successfully`);
    return result;
  } catch (error) {
    console.error("❌ Failed to trigger workflow:", error.message);
    throw error;
  }
}

/**
 * Get workflow execution history
 * @param {string} workflowId - N8N workflow ID
 * @param {number} limit - Number of executions to fetch
 * @returns {Promise<Array>} Execution history
 */
export async function getExecutionHistory(workflowId, limit = 10) {
  try {
    const response = await fetch(
      `${N8N_BASE_URL}/api/v1/workflows/${workflowId}/executions?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch execution history");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch execution history:", error.message);
    throw error;
  }
}

/**
 * Get specific execution details
 * @param {string} executionId - N8N execution ID
 * @returns {Promise<Object>} Execution details
 */
export async function getExecution(executionId) {
  try {
    const response = await fetch(`${N8N_BASE_URL}/api/v1/executions/${executionId}`, {
      method: "GET",
      headers: {
        "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
      }
    });

    if (!response.ok) {
      throw new Error("Execution not found");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Failed to fetch execution:", error.message);
    throw error;
  }
}

/**
 * Enable/Disable a workflow
 * @param {string} workflowId - N8N workflow ID
 * @param {boolean} active - True to enable, false to disable
 * @returns {Promise<Object>} Updated workflow
 */
export async function setWorkflowStatus(workflowId, active) {
  try {
    const response = await fetch(`${N8N_BASE_URL}/api/v1/workflows/${workflowId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-N8N-API-KEY": process.env.N8N_API_KEY || ""
      },
      body: JSON.stringify({
        active: active
      })
    });

    if (!response.ok) {
      throw new Error("Failed to update workflow status");
    }

    const status = active ? "enabled" : "disabled";
    console.log(`✅ Workflow ${workflowId} ${status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Failed to set workflow status:", error.message);
    throw error;
  }
}

/**
 * Trigger workflow via webhook (simplified trigger)
 * @param {string} webhookPath - Webhook path configured in N8N
 * @param {Object} data - Data to send
 * @returns {Promise<Object>} Webhook response
 */
export async function triggerViaWebhook(webhookPath, data = {}) {
  try {
    const url = `${N8N_WEBHOOK_URL}/${webhookPath}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Webhook failed: ${error}`);
    }

    console.log(`✅ Webhook ${webhookPath} triggered`);
    return await response.json();
  } catch (error) {
    console.error("❌ Webhook trigger failed:", error.message);
    throw error;
  }
}

/**
 * Get N8N connection status
 * @returns {Promise<Object>} Connection status
 */
export async function getN8NStatus() {
  try {
    const response = await fetch(`${N8N_BASE_URL}/health`, {
      method: "GET"
    });

    const status = response.ok ? "connected" : "disconnected";
    console.log(`✅ N8N status: ${status}`);

    return {
      status: status,
      url: N8N_BASE_URL,
      connected: response.ok
    };
  } catch (error) {
    console.error("❌ N8N connection failed:", error.message);
    return {
      status: "disconnected",
      url: N8N_BASE_URL,
      connected: false,
      error: error.message
    };
  }
}

/**
 * Trigger Facebook posting workflow
 * Used when products are created to post to Facebook
 * @param {Object} product - Product data
 * @returns {Promise<Object>} Workflow execution result
 */
export async function triggerFacebookPostingWorkflow(product) {
  try {
    console.log(`📱 Triggering Facebook posting workflow for: ${product.productName}`);

    return await triggerViaWebhook("product-facebook-post", {
      productName: product.productName,
      description: product.description,
      image: product.image,
      category: product.category,
      brand: product.brand,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.warn("⚠️ Facebook posting workflow failed (non-blocking):", error.message);
    // Non-blocking - don't throw
    return { error: error.message, triggered: false };
  }
}

/**
 * Trigger Instagram posting workflow
 * @param {Object} product - Product data
 * @returns {Promise<Object>} Workflow execution result
 */
export async function triggerInstagramPostingWorkflow(product) {
  try {
    console.log(`📱 Triggering Instagram posting workflow for: ${product.productName}`);

    return await triggerViaWebhook("product-instagram-post", {
      productName: product.productName,
      description: product.description,
      image: product.image,
      hashtags: product.tags || [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.warn("⚠️ Instagram posting workflow failed (non-blocking):", error.message);
    return { error: error.message, triggered: false };
  }
}

/**
 * Trigger TikTok posting workflow
 * @param {Object} product - Product data
 * @returns {Promise<Object>} Workflow execution result
 */
export async function triggerTikTokPostingWorkflow(product) {
  try {
    console.log(`🎵 Triggering TikTok posting workflow for: ${product.productName}`);

    return await triggerViaWebhook("product-tiktok-post", {
      productName: product.productName,
      description: product.description,
      image: product.image,
      tags: product.tags || [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.warn("⚠️ TikTok posting workflow failed (non-blocking):", error.message);
    return { error: error.message, triggered: false };
  }
}

/**
 * Trigger bulk social media posting
 * Posts product to all enabled platforms
 * @param {Object} product - Product data
 * @returns {Promise<Object>} Results from all workflows
 */
export async function triggerAllSocialMediaWorkflows(product) {
  try {
    console.log(`🌐 Triggering all social media workflows for: ${product.productName}`);

    const results = {
      facebook: null,
      instagram: null,
      tiktok: null
    };

    // Trigger all workflows in parallel (non-blocking)
    const promises = [
      triggerFacebookPostingWorkflow(product).then(r => { results.facebook = r; }),
      triggerInstagramPostingWorkflow(product).then(r => { results.instagram = r; }),
      triggerTikTokPostingWorkflow(product).then(r => { results.tiktok = r; })
    ];

    await Promise.all(promises);

    console.log(`✅ All social media workflows triggered`);
    return results;
  } catch (error) {
    console.error("❌ Failed to trigger social media workflows:", error.message);
    throw error;
  }
}

/**
 * Get N8N dashboard info
 * Returns useful info for displaying N8N status in main app
 * @returns {Promise<Object>} Dashboard information
 */
export async function getN8NDashboardInfo() {
  try {
    const status = await getN8NStatus();
    const workflows = status.connected ? await getWorkflows() : [];

    return {
      connected: status.connected,
      url: N8N_BASE_URL,
      workflowCount: workflows.length,
      workflows: workflows.map(w => ({
        id: w.id,
        name: w.name,
        active: w.active,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt
      }))
    };
  } catch (error) {
    console.error("❌ Failed to get dashboard info:", error.message);
    return {
      connected: false,
      url: N8N_BASE_URL,
      error: error.message
    };
  }
}

export default {
  getWorkflows,
  getWorkflow,
  triggerWorkflow,
  getExecutionHistory,
  getExecution,
  setWorkflowStatus,
  triggerViaWebhook,
  getN8NStatus,
  triggerFacebookPostingWorkflow,
  triggerInstagramPostingWorkflow,
  triggerTikTokPostingWorkflow,
  triggerAllSocialMediaWorkflows,
  getN8NDashboardInfo
};
