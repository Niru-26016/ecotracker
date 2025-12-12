/**
 * n8n Webhook Service for Carbon Footprint Analysis
 * Connects to n8n workflow that processes natural language input
 * and returns structured CO2 emission data
 */

class N8nService {
  constructor() {
    this.webhookUrl = import.meta.env?.VITE_N8N_WEBHOOK_URL;
    if (!this.webhookUrl) {
      console.warn('N8nService: VITE_N8N_WEBHOOK_URL is not configured. AI chat features will be disabled.');
    }
    this.isProcessing = false;
  }


  /**
   * Send natural language query to n8n workflow
   * @param {string} message - User's natural language input about carbon footprint
   * @returns {Promise<Object>} - Structured emission data
   */
  async analyzeEmissions(message) {
    if (this.isProcessing) {
      throw new Error('Previous analysis is still in progress');
    }

    try {
      this.isProcessing = true;

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          chatInput: message,
          timestamp: new Date()?.toISOString(),
          location: 'india',
          sessionId: this.generateSessionId()
        })
      });

      if (!response?.ok) {
        throw new Error(`n8n webhook request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response?.json();

      // Parse the structured output from n8n workflow
      return this.parseN8nResponse(data);

    } catch (error) {
      console.error('n8n Service Error:', error);
      throw new Error(`Failed to analyze emissions: ${error.message}`);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Parse n8n workflow response and format for chat interface
   * @param {Object} data - Raw response from n8n
   * @returns {Object} - Formatted emission data
   */
  parseN8nResponse(data) {
    try {
      // Handle different response formats from n8n
      const output = data?.output || data;

      const emissionData = {
        transport: output?.transport || null,
        food: output?.food || null,
        energy: output?.energy || null,
        lifestyle: output?.lifestyle || null,
        tips_to_reduce: output?.tips_to_reduce || []
      };

      // Calculate total emissions if individual categories are available
      let totalEmissions = 0;
      if (emissionData?.transport?.emissions_kg_co2) {
        totalEmissions += parseFloat(emissionData?.transport?.emissions_kg_co2);
      }
      if (emissionData?.energy?.emissions_kg_co2) {
        totalEmissions += parseFloat(emissionData?.energy?.emissions_kg_co2);
      }
      if (emissionData?.food?.emissions_kg_co2) {
        totalEmissions += parseFloat(emissionData?.food?.emissions_kg_co2);
      }
      if (emissionData?.lifestyle?.emissions_kg_co2) {
        totalEmissions += parseFloat(emissionData?.lifestyle?.emissions_kg_co2);
      }

      return {
        success: true,
        data: emissionData,
        totalEmissions: totalEmissions > 0 ? `${totalEmissions?.toFixed(2)} kg CO2` : null,
        timestamp: new Date()?.toISOString(),
        source: 'n8n-gemini-workflow'
      };

    } catch (error) {
      console.error('Error parsing n8n response:', error);
      return {
        success: false,
        error: 'Failed to parse emission analysis',
        data: null
      };
    }
  }

  /**
   * Generate unique session ID for tracking
   * @returns {string} - Session identifier
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
  }

  /**
   * Check if n8n webhook is reachable
   * @returns {Promise<boolean>} - Connection status
   */
  async checkConnection() {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'HEAD',
        timeout: 5000
      });
      return response?.ok;
    } catch (error) {
      console.error('n8n connection check failed:', error);
      return false;
    }
  }

  /**
   * Format emission data for display in chat
   * @param {Object} emissionData - Parsed emission data
   * @returns {Object} - Formatted data for MessageBubble component
   */
  formatForChat(emissionData) {
    if (!emissionData?.success || !emissionData?.data) {
      return {
        type: 'error',
        content: 'Unable to analyze carbon footprint from your message. Please provide more specific details about your activities.',
        error: true
      };
    }

    const { data, totalEmissions } = emissionData;
    const displayData = {};

    // Format transport data
    if (data?.transport) {
      displayData['🚗 Transport'] = `${data?.transport?.emissions_kg_co2} kg CO2 (${data?.transport?.mode}, ${data?.transport?.distance_km}km)`;
    }

    // Format energy data
    if (data?.energy) {
      displayData['⚡ Energy'] = `${data?.energy?.emissions_kg_co2} kg CO2`;
    }

    // Format food data
    if (data?.food) {
      displayData['🍽️ Food'] = `${data?.food?.emissions_kg_co2} kg CO2`;
    }

    // Format lifestyle data
    if (data?.lifestyle) {
      displayData['🏠 Lifestyle'] = `${data?.lifestyle?.emissions_kg_co2} kg CO2`;
    }

    // Add total if available
    if (totalEmissions) {
      displayData['📊 Total Emissions'] = totalEmissions;
    }

    return {
      type: 'data',
      content: 'Here\'s your carbon footprint analysis powered by n8n + Google Gemini:',
      data: displayData,
      actions: data?.tips_to_reduce?.length > 0 ? [
        {
          label: 'View Reduction Tips',
          icon: 'Lightbulb',
          onClick: () => this.showTips(data?.tips_to_reduce)
        }
      ] : undefined
    };
  }

  /**
   * Show reduction tips in a separate message
   * @param {Array} tips - Array of reduction tips
   */
  showTips(tips) {
    const tipsMessage = {
      type: 'action',
      content: 'Here are personalized tips to reduce your carbon footprint:',
      actions: tips?.slice(0, 3)?.map((tip, index) => ({
        label: `Tip ${index + 1}`,
        icon: 'Leaf',
        onClick: () => console.log('Tip clicked:', tip)
      }))
    };

    // This would need to be handled by the parent component
    console.log('Reduction Tips:', tips);
    return tipsMessage;
  }
}

// Export singleton instance
export const n8nService = new N8nService();
export default n8nService;