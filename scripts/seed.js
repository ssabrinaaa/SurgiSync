// scripts/seed.js
require("dotenv").config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand
} = require("@aws-sdk/lib-dynamodb");

const REGION = process.env.AWS_REGION || "us-east-1";
const TABLE  = process.env.PROCEDURES_TABLE || "procedures";

const rawProcedures = [
  {
    procedure_id: "1",
    name: "Appendectomy",
    preOp: [
      "Confirm NPO status 6–8 hours before surgery",
      "Obtain informed consent",
      "Pre‑op labs: CBC, electrolytes",
      "IV access established",
      "Administer antibiotics (per protocol)",
      "Vital signs and weight recorded",
      "Surgical site marked",
    ],
    postOp: [
      "Monitor for signs of infection (fever, redness)",
      "Assess bowel function (gas, bowel movement)",
      "Pain management plan in place",
      "Encourage early ambulation",
      "Wound care instructions",
      "Discharge teaching on activity limits and diet",
    ],
  },
  {
    procedure_id: "2",
    name: "Cholecystectomy",
    preOp: [
      "NPO after midnight",
      "Ultrasound confirmation",
      "Labs: LFTs, CBC",
      "Allergies and meds reviewed",
      "Consent signed",
      "Anesthesia evaluation",
    ],
    postOp: [
      "Monitor for bile leak or bleeding",
      "Pain and nausea control",
      "Diet advancement as tolerated",
      "Ambulate within 24 hours",
      "Wound care and dressing change",
      "Follow‑up appointment scheduled",
    ],
  },
  {
    procedure_id: "3",
    name: "Total Knee Replacement",
    preOp: [
      "Pre‑op education session completed",
      "Labs: CBC, PT/INR",
      "EKG, chest X‑ray (if indicated)",
      "NPO status confirmed",
      "Surgical site cleaned and marked",
      "Assistive device (walker) ready",
    ],
    postOp: [
      "Vitals and neurovascular checks",
      "Pain control via PCA or oral meds",
      "Begin physical therapy day 1",
      "Monitor for DVT (TED hose, SCDs)",
      "Wound monitoring and drain output",
      "Home care planning initiated",
    ],
  },
  {
    procedure_id: "4",
    name: "Cataract Surgery",
    preOp: [
      "Consent signed",
      "Pre‑op eye drops administered",
      "Blood pressure controlled",
      "Identify correct eye",
      "NPO status confirmed (if sedation used)",
    ],
    postOp: [
      "Protective eye shield in place",
      "Administer prescribed eye drops",
      "Monitor for vision changes or pain",
      "Avoid rubbing the eye",
      "Schedule follow‑up with ophthalmologist",
    ],
  },
  {
    procedure_id: "5",
    name: "Hernia Repair",
    preOp: [
      "Consent and anesthesia assessment",
      "NPO for 6–8 hours",
      "Site marked",
      "Pre‑op antibiotics given",
      "Review of comorbidities",
    ],
    postOp: [
      "Monitor for swelling or hematoma",
      "Pain control",
      "No heavy lifting >10 lbs for 4–6 weeks",
      "Ambulate as tolerated",
      "Wound care",
    ],
  },
  {
    procedure_id: "6",
    name: "C‑Section (Cesarean Delivery)",
    preOp: [
      "Fetal monitoring",
      "Consent signed for C‑section and possible complications",
      "Labs: CBC, type & screen",
      "IV started",
      "Abdomen shaved and prepped",
      "Antacid/antiemetic given",
    ],
    postOp: [
      "Monitor uterine tone and lochia",
      "Assess incision and fundus",
      "Pain management",
      "Breastfeeding support",
      "Early ambulation to prevent DVT",
      "Bonding time with baby",
    ],
  },
  {
    procedure_id: "7",
    name: "Coronary Artery Bypass Graft (CABG)",
    preOp: [
      "Cardiac clearance",
      "Chest X‑ray, labs, ECG",
      "Anesthesia consult",
      "Bowel prep if required",
      "Informed consent",
      "Skin prep and clipping",
    ],
    postOp: [
      "Monitor hemodynamics (BP, HR, oxygenation)",
      "Chest tube output",
      "Pain management",
      "Incentive spirometry",
      "Sternal precautions taught",
      "Cardiac rehab consult",
    ],
  },
  {
    procedure_id: "8",
    name: "Hysterectomy",
    preOp: [
      "Review imaging and labs",
      "Consent obtained for abdominal, vaginal, or laparoscopic route",
      "Bowel prep (if required)",
      "NPO after midnight",
      "IV fluids and antibiotics",
    ],
    postOp: [
      "Monitor vaginal bleeding",
      "Assess pain and bowel function",
      "Prevent DVT with SCDs",
      "Wound or incision monitoring",
      "Hormonal support if ovaries removed",
    ],
  },
  {
    procedure_id: "9",
    name: "Tonsillectomy",
    preOp: [
      "NPO 6 hours before",
      "Review history of bleeding disorders",
      "Consent signed",
      "Pediatric prep (if child)",
      "Anesthesia consult",
    ],
    postOp: [
      "Monitor for bleeding",
      "Encourage fluids (avoid red‐colored drinks)",
      "Pain control (acetaminophen/ibuprofen)",
      "Soft diet recommended",
      "Avoid strenuous activity",
    ],
  },
  {
    procedure_id: "10",
    name: "Spinal Fusion",
    preOp: [
      "MRI/CT scan reviewed",
      "Blood work: CBC, coagulation panel",
      "Pre‑surgical bath (CHG wipes)",
      "Informed consent",
      "Stop NSAIDs prior to surgery",
      "Pre‑op education",
    ],
    postOp: [
      "Neurologic checks (movement, sensation)",
      "Pain management (often PCA)",
      "Wound monitoring",
      "Log‑roll technique education",
      "PT/OT involvement for mobility",
      "Limit bending, lifting, twisting",
    ],
  },
];

async function seed() {
  const client = new DynamoDBClient({ region: REGION });
  const ddb    = DynamoDBDocumentClient.from(client);

  for (const proc of rawProcedures) {
    try {
      await ddb.send(new PutCommand({
        TableName: TABLE,
        Item: proc
      }));
      console.log(`✔ Inserted [${proc.procedure_id}] ${proc.name}`);
    } catch (err) {
      console.error(`✖ Failed to insert ${proc.name}`, err);
    }
  }
}

seed();
