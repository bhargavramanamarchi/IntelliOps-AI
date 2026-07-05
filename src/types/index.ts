export interface Supplier {
  id: string;
  name: string;
  pricePerUnit: number;
  deliveryDays: number;
  rating: number;
  recommendationScore: number; // 0 to 100
  isBestMatch: boolean;
  notes: string;
}

export type AgentStatus = 'idle' | 'running' | 'success' | 'error';

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  output: string;
  logs: string[];
}

export interface PurchaseOrder {
  poNumber: string;
  date: string;
  deliveryDeadline: string;
  item: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  tax: number;
  total: number;
  supplier: {
    name: string;
    contact: string;
    email: string;
    address: string;
    gstin?: string;
  };
  buyer: {
    company: string;
    contact: string;
    email: string;
    address: string;
    gstin?: string;
  };
}

export interface AnalyticsData {
  estimatedSavings: number;
  processingTimeSeconds: number;
  currentInventory: number;
  targetInventory: number;
  selectedSupplier: string | null;
}

export interface WorkflowScenario {
  id: string;
  name: string;
  shortLabel: string;
  inputText: string;
  itemName: string;
  quantity: number;
  currentStock: number;
  targetStock: number;
  deficit: number;
  savings: number;
  processingTime: number;
  suppliers: Supplier[];
  po: PurchaseOrder;
  agentLogs: {
    requirement: string[];
    inventory: string[];
    supplier: string[];
    po: string[];
  };
  agentOutputs: {
    requirement: string;
    inventory: string;
    supplier: string;
    po: string;
  };
}
