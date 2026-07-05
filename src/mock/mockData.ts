import type { WorkflowScenario } from '../types';

export const SCENARIOS: Record<string, WorkflowScenario> = {
  wood: {
    id: 'wood',
    name: 'Wooden Boards',
    shortLabel: '500 Wooden Boards',
    inputText: 'Need 500 Wooden Boards before Friday',
    itemName: 'Grade A Teak Wooden Boards',
    quantity: 500,
    currentStock: 150,
    targetStock: 500,
    deficit: 350,
    savings: 141750,
    processingTime: 4.2,
    suppliers: [
      {
        id: 'sup-w1',
        name: 'GreenWood Suppliers Pvt. Ltd.',
        pricePerUnit: 850.00,
        deliveryDays: 3,
        rating: 4.8,
        recommendationScore: 98,
        isBestMatch: true,
        notes: 'Optimal balance between delivery time and premium B2B quality wood sourcing.'
      },
      {
        id: 'sup-w2',
        name: 'Vrindavan Timber Depot',
        pricePerUnit: 980.00,
        deliveryDays: 2,
        rating: 4.2,
        recommendationScore: 85,
        isBestMatch: false,
        notes: 'Fastest delivery but carries a 15.3% premium pricing.'
      },
      {
        id: 'sup-w3',
        name: 'Malabar Woods & Log Ltd.',
        pricePerUnit: 800.00,
        deliveryDays: 6,
        rating: 4.0,
        recommendationScore: 71,
        isBestMatch: false,
        notes: 'Lowest unit cost but delivery time fails standard Friday SLA target.'
      }
    ],
    po: {
      poNumber: 'PO-IND-2026-4402',
      date: '2026-07-05',
      deliveryDeadline: '2026-07-10 (Friday)',
      item: 'Grade A Teak Wooden Boards',
      quantity: 350,
      pricePerUnit: 850.00,
      subtotal: 297500.00,
      tax: 53550.00,
      total: 351050.00,
      supplier: {
        name: 'GreenWood Suppliers Pvt. Ltd.',
        contact: 'Rahul Sharma (Enterprise Sales)',
        email: 'rsharma@greenwood.co.in',
        address: '45 Industrial Area, Peenya, Bengaluru, Karnataka 560058'
      },
      buyer: {
        company: 'Nova Furniture Manufacturing Pvt. Ltd.',
        contact: 'Bhargav (Procurement Manager)',
        email: 'bhargav@novafurniture.co.in',
        address: '400 Innovation Drive, Tech Park, Gachibowli, Hyderabad, Telangana 500081'
      }
    },
    agentLogs: {
      requirement: [
        '🔍 Initializing Requirement Agent...',
        '📥 Ingesting prompt: "Need 500 Wooden Boards before Friday"',
        '💬 Processing natural language request with NLP parser...',
        '✅ Identified target entity: "Teak Wooden Boards" (Mapped to SKU: TEAK-WND-GRD-A)',
        '🔢 Extracted quantity requirement: 500 units',
        '📅 Detected deadline parameter: "before Friday" (Parsed as July 10, 2026)',
        '🛠️ Formatting standardized JSON request payload...',
        '🚀 Dispatching Requirement Payload to Inventory Agent'
      ],
      inventory: [
        '🔍 Initializing Inventory Agent...',
        '📥 Received Requisition Payload: 500 x SKU: TEAK-WND-GRD-A',
        '🏢 Accessing central raw material registers...',
        '📦 Checking Warehouse A (Main Stockpile)... Found 120 units',
        '📦 Checking Warehouse B (Buffer Stock)... Found 30 units',
        '📊 Total Current Active Stock: 150 units',
        '⚠️ Inventory Deficit Identified: 350 units required',
        '📝 Initiating requisition ticket #REQ-2026-081',
        '🚀 Forwarding procurement ticket to Supplier Recommendation Agent'
      ],
      supplier: [
        '🔍 Initializing Supplier Recommendation Agent...',
        '📥 Received Requisition Ticket: Buy 350 x SKU: TEAK-WND-GRD-A',
        '🌐 Querying B2B suppliers.json catalog data...',
        '📩 Pulling quotes from certified vendors...',
        '⚡ [GreenWood Suppliers] returned quote: ₹850.00/unit, 3 days delivery, 4.8★ rating',
        '⚡ [Vrindavan Timber Depot] returned quote: ₹980.00/unit, 2 days delivery, 4.2★ rating',
        '⚡ [Malabar Woods & Log] returned quote: ₹800.00/unit, 6 days delivery, 4.0★ rating',
        '⚖️ Evaluation: Malabar delivery (6 days) violates Friday deadline. GreenWood provides the optimal balance.',
        '📈 Computing recommendation matrix based on pricing, lead time, and rating...',
        '✅ Selected Vendor: GreenWood Suppliers Pvt. Ltd. (Score: 98/100)',
        '🚀 Releasing selection to Purchase Order Agent'
      ],
      po: [
        '🔍 Initializing Purchase Order Agent...',
        '📥 Received approval for GreenWood Suppliers (350 units @ ₹850.00)',
        '📄 Populating Indian GST B2B PO invoice template (HSN: 4407)...',
        '🔢 Assisting PO reference number: PO-IND-2026-4402',
        '🏢 Mapping Buyer details (Nova Furniture) and Vendor details (GreenWood Suppliers)...',
        '💳 Computing final costs: Subtotal ₹2,97,500.00, GST (18%) ₹53,550.00, Net Total ₹3,51,050.00',
        '✍️ Inserting automated agent cryptographic verification signatures...',
        '🎉 Purchase Order draft finalized and awaiting review!'
      ]
    },
    agentOutputs: {
      requirement: JSON.stringify({
        status: "success",
        data: {
          category: "materials",
          sku_match: "TEAK-WND-GRD-A",
          resolved_name: "Grade A Teak Wooden Boards",
          target_quantity: 500,
          deadline: "2026-07-10T17:00:00Z",
          constraints: ["delivery_speed_priority"]
        }
      }, null, 2),
      inventory: JSON.stringify({
        status: "success",
        data: {
          sku: "TEAK-WND-GRD-A",
          stock_on_hand: 150,
          available: 150,
          deficit: 350,
          action: "procure_external",
          requisition_id: "REQ-2026-081"
        }
      }, null, 2),
      supplier: JSON.stringify({
        status: "success",
        data: {
          evaluated_suppliers: 3,
          valid_suppliers: 2,
          selected_supplier_name: "GreenWood Suppliers Pvt. Ltd.",
          score: 98,
          rejection_reason_malabar: "Delivery lead time of 6 days violates deadline of Friday."
        }
      }, null, 2),
      po: JSON.stringify({
        status: "draft_generated",
        data: {
          po_number: "PO-IND-2026-4402",
          vendor: "GreenWood Suppliers Pvt. Ltd.",
          buyer: "Nova Furniture Manufacturing Pvt. Ltd.",
          items: [{ sku: "TEAK-WND-GRD-A", hsn: "4407", quantity: 350, unit_price: 850.00, total: 297500.00 }],
          tax_rate: 0.18,
          tax_breakdown: { cgst: 26775.00, sgst: 26775.00 },
          grand_total: 351050.00,
          require_approval: true
        }
      }, null, 2)
    }
  },
  steel: {
    id: 'steel',
    name: 'Steel Shafts',
    shortLabel: '1200 Steel Shafts',
    inputText: 'Order 1200 Industrial Steel Shafts (8mm) urgently',
    itemName: 'Industrial Mild Steel Shafts (8mm)',
    quantity: 1200,
    currentStock: 800,
    targetStock: 1200,
    deficit: 400,
    savings: 12000,
    processingTime: 3.8,
    suppliers: [
      {
        id: 'sup-s1',
        name: 'Shakti Steel Industries',
        pricePerUnit: 450.00,
        deliveryDays: 2,
        rating: 4.9,
        recommendationScore: 99,
        isBestMatch: true,
        notes: 'Highest quality rating and superb enterprise reliability in south India raw materials.'
      },
      {
        id: 'sup-s2',
        name: 'JSW Steel',
        pricePerUnit: 480.00,
        deliveryDays: 1,
        rating: 4.6,
        recommendationScore: 92,
        isBestMatch: false,
        notes: 'Saves 1 day of transit but commands an additional 6.6% markup.'
      },
      {
        id: 'sup-s3',
        name: 'Tata Steel',
        pricePerUnit: 430.00,
        deliveryDays: 5,
        rating: 4.1,
        recommendationScore: 78,
        isBestMatch: false,
        notes: 'Cheapest unit cost but delivery time exceeds required urgent SLA.'
      }
    ],
    po: {
      poNumber: 'PO-IND-2026-4403',
      date: '2026-07-05',
      deliveryDeadline: '2026-07-08 (Urgent)',
      item: 'Industrial Mild Steel Shafts (8mm)',
      quantity: 400,
      pricePerUnit: 450.00,
      subtotal: 180000.00,
      tax: 32400.00,
      total: 212400.00,
      supplier: {
        name: 'Shakti Steel Industries',
        contact: 'Priya Reddy (Sales Specialist)',
        email: 'preddy@shaktisteel.co.in',
        address: 'Plot 88, Phase III, IDA Jeedimetla, Hyderabad, Telangana 500055'
      },
      buyer: {
        company: 'Nova Furniture Manufacturing Pvt. Ltd.',
        contact: 'Bhargav (Procurement Manager)',
        email: 'bhargav@novafurniture.co.in',
        address: '400 Innovation Drive, Tech Park, Gachibowli, Hyderabad, Telangana 500081'
      }
    },
    agentLogs: {
      requirement: [
        '🔍 Initializing Requirement Agent...',
        '📥 Ingesting prompt: "Order 1200 Industrial Steel Shafts (8mm) urgently"',
        '💬 Processing natural language request with NLP parser...',
        '✅ Identified target entity: "Steel Shafts" (Mapped to SKU: MS-SHFT-8MM)',
        '🔢 Extracted quantity requirement: 1200 units',
        '📅 Detected deadline parameter: "urgently" (Parsed as <= 3 days, July 08, 2026)',
        '🛠️ Formatting standardized JSON request payload...',
        '🚀 Dispatching Requirement Payload to Inventory Agent'
      ],
      inventory: [
        '🔍 Initializing Inventory Agent...',
        '📥 Received Requisition Payload: 1200 x SKU: MS-SHFT-8MM',
        '🏢 Accessing central raw material registers...',
        '📦 Checking Warehouse A (Main Stockpile)... Found 650 units',
        '📦 Checking Warehouse B (Buffer Stock)... Found 150 units',
        '📊 Total Current Active Stock: 800 units',
        '⚠️ Inventory Deficit Identified: 400 units required',
        '📝 Initiating requisition ticket #REQ-2026-082',
        '🚀 Forwarding procurement ticket to Supplier Recommendation Agent'
      ],
      supplier: [
        '🔍 Initializing Supplier Recommendation Agent...',
        '📥 Received Requisition Ticket: Buy 400 x SKU: MS-SHFT-8MM',
        '🌐 Querying B2B suppliers.json catalog data...',
        '📩 Pulling quotes from certified vendors...',
        '⚡ [Shakti Steel] returned quote: ₹450.00/unit, 2 days delivery, 4.9★ rating',
        '⚡ [JSW Steel] returned quote: ₹480.00/unit, 1 day delivery, 4.6★ rating',
        '⚡ [Tata Steel] returned quote: ₹430.00/unit, 5 days delivery, 4.1★ rating',
        '⚖️ Evaluation: JSW is fastest (1 day), Shakti Steel offers the best quality/price index. Tata Steel lead time violates urgency SLA.',
        '📈 Computing recommendation matrix based on pricing, lead time, and rating...',
        '✅ Selected Vendor: Shakti Steel Industries (Score: 99/100)',
        '🚀 Releasing selection to Purchase Order Agent'
      ],
      po: [
        '🔍 Initializing Purchase Order Agent...',
        '📥 Received approval for Shakti Steel Industries (400 units @ ₹450.00)',
        '📄 Populating Indian GST B2B PO invoice template (HSN: 7306)...',
        '🔢 Assisting PO reference number: PO-IND-2026-4403',
        '🏢 Mapping Buyer details (Nova Furniture) and Vendor details (Shakti Steel)...',
        '💳 Computing final costs: Subtotal ₹1,80,000.00, GST (18%) ₹32,400.00, Net Total ₹2,12,400.00',
        '✍️ Inserting automated agent cryptographic verification signatures...',
        '🎉 Purchase Order draft finalized and awaiting review!'
      ]
    },
    agentOutputs: {
      requirement: JSON.stringify({
        status: "success",
        data: {
          category: "metals",
          sku_match: "MS-SHFT-8MM",
          resolved_name: "Industrial Mild Steel Shafts (8mm)",
          target_quantity: 1200,
          deadline: "2026-07-08T17:00:00Z",
          constraints: ["urgency_priority"]
        }
      }, null, 2),
      inventory: JSON.stringify({
        status: "success",
        data: {
          sku: "MS-SHFT-8MM",
          stock_on_hand: 800,
          available: 800,
          deficit: 400,
          action: "procure_external",
          requisition_id: "REQ-2026-082"
        }
      }, null, 2),
      supplier: JSON.stringify({
        status: "success",
        data: {
          evaluated_suppliers: 3,
          valid_suppliers: 2,
          selected_supplier_name: "Shakti Steel Industries",
          score: 99,
          rejection_reason_tata: "Lead time of 5 days violates target urgency constraint."
        }
      }, null, 2),
      po: JSON.stringify({
        status: "draft_generated",
        data: {
          po_number: "PO-IND-2026-4403",
          vendor: "Shakti Steel Industries",
          buyer: "Nova Furniture Manufacturing Pvt. Ltd.",
          items: [{ sku: "MS-SHFT-8MM", hsn: "7306", quantity: 400, unit_price: 450.00, total: 180000.00 }],
          tax_rate: 0.18,
          tax_breakdown: { cgst: 16200.00, sgst: 16200.00 },
          grand_total: 212400.00,
          require_approval: true
        }
      }, null, 2)
    }
  },
  chairs: {
    id: 'chairs',
    name: 'Office Chairs',
    shortLabel: '80 Ergonomic Chairs',
    inputText: 'Procure 80 high-back ergonomic office chairs by next month',
    itemName: 'Ergonomic Office Chairs (High-Back)',
    quantity: 80,
    currentStock: 12,
    targetStock: 80,
    deficit: 68,
    savings: 20400,
    processingTime: 5.1,
    suppliers: [
      {
        id: 'sup-c1',
        name: 'SitWell Ergonomics',
        pricePerUnit: 4500.00,
        deliveryDays: 10,
        rating: 4.7,
        recommendationScore: 95,
        isBestMatch: true,
        notes: 'Excellent comfort reviews, solid commercial warranty, and competitive bulk price.'
      },
      {
        id: 'sup-c2',
        name: 'ComfortSeat India',
        pricePerUnit: 4800.00,
        deliveryDays: 7,
        rating: 4.3,
        recommendationScore: 88,
        isBestMatch: false,
        notes: '3 days faster delivery, but overall unit costs are higher by ₹300.'
      },
      {
        id: 'sup-c3',
        name: 'Godrej Interio',
        pricePerUnit: 4300.00,
        deliveryDays: 18,
        rating: 4.5,
        recommendationScore: 82,
        isBestMatch: false,
        notes: 'Lowest unit price, but delivery time of 18 days is close to the margin.'
      }
    ],
    po: {
      poNumber: 'PO-IND-2026-4404',
      date: '2026-07-05',
      deliveryDeadline: '2026-08-05 (30 Days)',
      item: 'Ergonomic Office Chairs (High-Back)',
      quantity: 68,
      pricePerUnit: 4500.00,
      subtotal: 306000.00,
      tax: 55080.00,
      total: 361080.00,
      supplier: {
        name: 'SitWell Ergonomics',
        contact: 'Rajesh Patil (Enterprise Accounts)',
        email: 'rpatil@sitwell.co.in',
        address: '202 Posture Lane, Chinchwad, Pune, Maharashtra 411019'
      },
      buyer: {
        company: 'Nova Furniture Manufacturing Pvt. Ltd.',
        contact: 'Bhargav (Procurement Manager)',
        email: 'bhargav@novafurniture.co.in',
        address: '400 Innovation Drive, Tech Park, Gachibowli, Hyderabad, Telangana 500081'
      }
    },
    agentLogs: {
      requirement: [
        '🔍 Initializing Requirement Agent...',
        '📥 Ingesting prompt: "Procure 80 high-back ergonomic office chairs by next month"',
        '💬 Processing natural language request with NLP parser...',
        '✅ Identified target entity: "Ergonomic Office Chairs" (Mapped to SKU: FUR-ERG-CHR)',
        '🔢 Extracted quantity requirement: 80 units',
        '📅 Detected deadline parameter: "by next month" (Parsed as August 05, 2026)',
        '🛠️ Formatting standardized JSON request payload...',
        '🚀 Dispatching Requirement Payload to Inventory Agent'
      ],
      inventory: [
        '🔍 Initializing Inventory Agent...',
        '📥 Received Requisition Payload: 80 x SKU: FUR-ERG-CHR',
        '🏢 Accessing central raw material registers...',
        '📦 Checking Warehouse B (HQ Furniture Storage)... Found 12 units',
        '📊 Total Current Active Stock: 12 units',
        '⚠️ Inventory Deficit Identified: 68 units required',
        '📝 Initiating requisition ticket #REQ-2026-083',
        '🚀 Forwarding procurement ticket to Supplier Recommendation Agent'
      ],
      supplier: [
        '🔍 Initializing Supplier Recommendation Agent...',
        '📥 Received Requisition Ticket: Buy 68 x SKU: FUR-ERG-CHR',
        '🌐 Querying B2B suppliers.json catalog data...',
        '📩 Pulling quotes from certified vendors...',
        '⚡ [SitWell Ergonomics] returned quote: ₹4,500.00/unit, 10 days delivery, 4.7★ rating',
        '⚡ [ComfortSeat India] returned quote: ₹4,800.00/unit, 7 days delivery, 4.3★ rating',
        '⚡ [Godrej Interio] returned quote: ₹4,300.00/unit, 18 days delivery, 4.5★ rating',
        '⚖️ Evaluation: All options meet deadline constraint. SitWell offers the highest combined quality + bulk savings index.',
        '📈 Computing recommendation matrix based on pricing, lead time, and rating...',
        '✅ Selected Vendor: SitWell Ergonomics (Score: 95/100)',
        '🚀 Releasing selection to Purchase Order Agent'
      ],
      po: [
        '🔍 Initializing Purchase Order Agent...',
        '📥 Received approval for SitWell Ergonomics (68 units @ ₹4,500.00)',
        '📄 Populating Indian GST B2B PO invoice template (HSN: 9403)...',
        '🔢 Assisting PO reference number: PO-IND-2026-4404',
        '🏢 Mapping Buyer details (Nova Furniture) and Vendor details (SitWell)...',
        '💳 Computing final costs: Subtotal ₹3,06,000.00, GST (18%) ₹55,080.00, Net Total ₹3,61,080.00',
        '✍️ Inserting automated agent cryptographic verification signatures...',
        '🎉 Purchase Order draft finalized and awaiting review!'
      ]
    },
    agentOutputs: {
      requirement: JSON.stringify({
        status: "success",
        data: {
          category: "furniture",
          sku_match: "FUR-ERG-CHR",
          resolved_name: "Ergonomic Office Chairs (High-Back)",
          target_quantity: 80,
          deadline: "2026-08-05T17:00:00Z",
          constraints: ["high_rating_priority"]
        }
      }, null, 2),
      inventory: JSON.stringify({
        status: "success",
        data: {
          sku: "FUR-ERG-CHR",
          stock_on_hand: 12,
          available: 12,
          deficit: 68,
          action: "procure_external",
          requisition_id: "REQ-2026-083"
        }
      }, null, 2),
      supplier: JSON.stringify({
        status: "success",
        data: {
          evaluated_suppliers: 3,
          valid_suppliers: 3,
          selected_supplier_name: "SitWell Ergonomics",
          score: 95,
          analysis: "Selected SitWell due to balanced pricing and quality index. Godrej was rejected due to long lead times."
        }
      }, null, 2),
      po: JSON.stringify({
        status: "draft_generated",
        data: {
          po_number: "PO-IND-2026-4404",
          vendor: "SitWell Ergonomics",
          buyer: "Nova Furniture Manufacturing Pvt. Ltd.",
          items: [{ sku: "FUR-ERG-CHR", hsn: "9403", quantity: 68, unit_price: 4500.00, total: 306000.00 }],
          tax_rate: 0.18,
          tax_breakdown: { cgst: 27540.00, sgst: 27540.00 },
          grand_total: 361080.00,
          require_approval: true
        }
      }, null, 2)
    }
  }
};
