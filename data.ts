
import { Stage } from './types';

export const CHECKLIST_DATA: Stage[] = [
  {
    id: 'stage-01',
    number: '01',
    title: 'Kickoff Call',
    subSections: [
      {
        id: '01-01',
        title: 'Communication & Project Setup',
        category: 'general',
        tasks: [
          { id: 't1', label: 'Primary communication channel (Slack, email, WhatsApp, etc.)', completed: false },
          { id: 't2', label: 'Frequency of check-ins and feedback sessions', completed: false },
          { id: 't3', label: 'Decision-making process and approval workflows', completed: false },
          { id: 't4', label: 'Emergency contact procedures', completed: false },
          { id: 't5', label: 'File sharing and document collaboration preferences', completed: false },
        ]
      },
      {
        id: '01-02',
        title: 'Outbound Agent - Intro & Greeting',
        category: 'outbound',
        tasks: [
          { id: 't6', label: 'Agent name/identity', completed: false },
          { id: 't7', label: 'Company introduction script', completed: false },
          { id: 't8', label: 'Opening line/hook', completed: false },
          { id: 't9', label: 'How to introduce the purpose of the call', completed: false },
          { id: 't10', label: 'Tone and personality', completed: false },
        ]
      },
      {
        id: '01-03',
        title: 'Outbound Agent - Lead Qualification',
        category: 'outbound',
        tasks: [
          { id: 't11', label: 'What information do we already have about the lead?', completed: false },
          { id: 't12', label: 'What additional questions should the agent ask?', completed: false },
          { id: 't13', label: 'What disqualifies a lead?', completed: false },
          { id: 't14', label: 'How deep should qualification go before moving to CTA?', completed: false },
          { id: 't15', label: 'Required vs. optional qualification questions', completed: false },
        ]
      },
      {
        id: '01-04',
        title: 'Outbound Agent - Call to Action',
        category: 'outbound',
        tasks: [
          { id: 't16', label: 'Primary goal: appointment setting or transfer to human?', completed: false },
          { id: 't17', label: 'What type of appointment (discovery call, demo, consultation)?', completed: false },
          { id: 't18', label: 'Who should appointments be scheduled with?', completed: false },
          { id: 't19', label: 'What information is needed to book the appointment?', completed: false },
          { id: 't20', label: 'When should agent transfer instead of booking?', completed: false },
          { id: 't21', label: 'Calendar integration requirements', completed: false },
        ]
      },
      {
        id: '01-05',
        title: 'Outbound Agent - Objection Handling',
        category: 'outbound',
        tasks: [
          { id: 't22', label: 'Common objections the agent should address', completed: false },
          { id: 't23', label: 'Which objections require transfer to human', completed: false },
          { id: 't24', label: 'Scripts for handling price, timing, authority objections', completed: false },
          { id: 't25', label: 'When to push vs. when to back off', completed: false },
          { id: 't26', label: 'Follow-up procedures for unresolved objections', completed: false },
        ]
      },
      {
        id: '01-06',
        title: 'Outbound Agent - Close & Follow-up',
        category: 'outbound',
        tasks: [
          { id: 't27', label: 'How to confirm appointment details', completed: false },
          { id: 't28', label: 'What confirmation information to send (SMS/email)', completed: false },
          { id: 't29', label: 'What happens if no appointment is set?', completed: false },
          { id: 't30', label: 'Follow-up timing and method', completed: false },
          { id: 't31', label: 'How to end the call professionally', completed: false },
        ]
      },
      {
        id: '01-07',
        title: 'Outbound Agent - Escalations & Edge Cases',
        category: 'outbound',
        tasks: [
          { id: 't32', label: 'When to transfer to a human immediately', completed: false },
          { id: 't33', label: 'How to handle hostile or unresponsive prospects', completed: false },
          { id: 't34', label: 'What to do if calendar system is down', completed: false },
          { id: 't35', label: 'Gatekeeper handling procedures', completed: false },
          { id: 't36', label: 'Do Not Call list management', completed: false },
        ]
      },
      {
        id: '01-08',
        title: 'Inbound Agent - Greeting & Identification',
        category: 'inbound',
        tasks: [
          { id: 't37', label: 'Agent name/identity', completed: false },
          { id: 't38', label: 'Company greeting script', completed: false },
          { id: 't39', label: 'How to ask how they can help', completed: false },
          { id: 't40', label: 'Hours/availability messaging', completed: false },
          { id: 't41', label: 'Tone and personality', completed: false },
        ]
      },
      {
        id: '01-09',
        title: 'Inbound Agent - Need Identification',
        category: 'inbound',
        tasks: [
          { id: 't42', label: "How to determine caller's purpose", completed: false },
          { id: 't43', label: 'Categories of inquiries to route differently', completed: false },
          { id: 't44', label: 'Knowledge base Q&A content', completed: false },
          { id: 't45', label: 'Scripted responses vs. general knowledge', completed: false },
          { id: 't46', label: 'What questions/topics require transfer to human', completed: false },
          { id: 't47', label: 'Canned language for specific scenarios', completed: false },
        ]
      },
      {
        id: '01-10',
        title: 'Inbound Agent - Information & Routing',
        category: 'inbound',
        tasks: [
          { id: 't48', label: 'What information can the agent provide directly?', completed: false },
          { id: 't49', label: 'What questions require transfer to human?', completed: false },
          { id: 't50', label: 'Self-service options to offer', completed: false },
          { id: 't51', label: 'When to provide information vs. when to route', completed: false },
          { id: 't52', label: 'Links/resources to send via SMS', completed: false },
        ]
      },
      {
        id: '01-11',
        title: 'Inbound Agent - Appointment/Transfer',
        category: 'inbound',
        tasks: [
          { id: 't53', label: 'What types of appointments can the agent book?', completed: false },
          { id: 't54', label: 'Transfer destinations for different inquiry types', completed: false },
          { id: 't55', label: 'When to transfer vs. take a message', completed: false },
          { id: 't56', label: 'Required information for booking/transfers', completed: false },
          { id: 't57', label: 'Voicemail vs. live transfer procedures', completed: false },
        ]
      },
      {
        id: '01-12',
        title: 'Inbound Agent - Follow-up & Close',
        category: 'inbound',
        tasks: [
          { id: 't58', label: 'What information to send after the call', completed: false },
          { id: 't59', label: 'How to confirm next steps with caller', completed: false },
          { id: 't60', label: 'Message-taking procedures', completed: false },
          { id: 't61', label: 'How to end the call professionally', completed: false },
          { id: 't62', label: 'Callback scheduling if needed', completed: false },
        ]
      },
      {
        id: '01-13',
        title: 'Inbound Agent - Escalations & Edge Cases',
        category: 'inbound',
        tasks: [
          { id: 't63', label: 'When to transfer to manager/supervisor', completed: false },
          { id: 't64', label: 'How to handle frustrated or upset callers', completed: false },
          { id: 't65', label: 'After-hours procedures', completed: false },
          { id: 't66', label: 'Emergency handling protocols', completed: false },
          { id: 't67', label: 'System down procedures', completed: false },
        ]
      },
      {
        id: '01-14',
        title: 'Technical - Phone System & SMS',
        category: 'technical',
        tasks: [
          { id: 't68', label: 'Current phone system and forwarding plan', completed: false },
          { id: 't69', label: 'SMS service setup requirements', completed: false },
          { id: 't70', label: 'Call recording and routing setup', completed: false },
          { id: 't71', label: 'Number forwarding logistics', completed: false },
          { id: 't72', label: 'Third-party communication tools needed', completed: false },
        ]
      },
      {
        id: '01-15',
        title: 'Technical - Links & Resources',
        category: 'technical',
        tasks: [
          { id: 't73', label: 'What links, copy, or resources should be sent via SMS', completed: false },
          { id: 't74', label: 'Different types of information callers might need', completed: false },
          { id: 't75', label: 'Self-service options available to callers', completed: false },
          { id: 't76', label: 'Website pages or documents to reference', completed: false },
          { id: 't77', label: 'Location or service-specific resources', completed: false },
        ]
      },
      {
        id: '01-16',
        title: 'Technical - Transfer Contacts & Routing',
        category: 'technical',
        tasks: [
          { id: 't78', label: 'Contact information for different transfer scenarios', completed: false },
          { id: 't79', label: 'When to transfer vs. when to handle directly', completed: false },
          { id: 't80', label: 'Department or role-based routing requirements', completed: false },
          { id: 't81', label: 'Escalation hierarchy and procedures', completed: false },
          { id: 't82', label: 'Warm vs. cold transfer preferences', completed: false },
        ]
      },
      {
        id: '01-17',
        title: 'Technical - Knowledge Base Strategy',
        category: 'technical',
        tasks: [
          { id: 't83', label: 'What information the agent should provide directly', completed: false },
          { id: 't84', label: 'Required scripts or specific language for certain scenarios', completed: false },
          { id: 't85', label: 'Boundaries between general answers and detailed explanations', completed: false },
          { id: 't86', label: 'Topics that require human expertise or transfer', completed: false },
          { id: 't87', label: 'Tone and messaging consistency requirements', completed: false },
        ]
      },
      {
        id: '01-18',
        title: 'Technical - CRM/System Integration',
        category: 'technical',
        tasks: [
          { id: 't88', label: 'What systems need to connect with the voice agent', completed: false },
          { id: 't89', label: 'Information to collect and where to store it', completed: false },
          { id: 't90', label: 'Required fields for lead or contact creation', completed: false },
          { id: 't91', label: 'API access and credential requirements', completed: false },
          { id: 't92', label: 'Integration platform preferences and capabilities', completed: false },
        ]
      },
      {
        id: '01-19',
        title: 'Technical - Notifications & Reporting',
        category: 'technical',
        tasks: [
          { id: 't93', label: 'How the team wants to be notified of calls and outcomes', completed: false },
          { id: 't94', label: 'Real-time vs. batch notification preferences', completed: false },
          { id: 't95', label: 'Reporting and logging requirements', completed: false },
          { id: 't96', label: 'Dashboard or analytics tool needs', completed: false },
          { id: 't97', label: 'Specific triggers that require immediate attention', completed: false },
        ]
      },
      {
        id: '01-20',
        title: 'Technical - Operating Parameters',
        category: 'technical',
        tasks: [
          { id: 't98', label: 'When is the agent active vs. inactive?', completed: false },
          { id: 't99', label: 'Business hours vs. agent hours', completed: false },
          { id: 't100', label: 'Holiday and special date handling', completed: false },
          { id: 't101', label: 'Call volume expectations', completed: false },
          { id: 't102', label: 'Performance monitoring requirements', completed: false },
        ]
      }
    ]
  },
  {
    id: 'stage-02',
    number: '02',
    title: 'Create Prompt v1',
    tasks: [
      { id: 't103', label: 'Create new organization for the client in Retell', completed: false },
      { id: 't104', label: 'Leverage: Demo prompt', completed: false },
      { id: 't105', label: 'Leverage: Boondocks prompt (or other similar production grade)', completed: false },
      { id: 't106', label: "Leverage: Claude's prompt project", completed: false },
      { id: 't107', label: 'Leverage: Kickoff call notes and requirements', completed: false },
    ]
  },
  {
    id: 'stage-03',
    number: '03',
    title: 'Telephony',
    description: 'Configure Twilio subaccount with dedicated phone numbers, ensuring proper A2P registration and SIP trunk connectivity to Retell for production call handling.',
    tasks: [
      { id: 't108', label: 'Create Twilio sub account', completed: false },
      { id: 't109', label: 'Buy phone numbers', completed: false },
      { id: 't110', label: 'A2P: Share main account brand with corresponding SID of subaccount', completed: false },
      { id: 't111', label: 'Configure SIP trunk connectivity to Retell', completed: false },
    ]
  },
  {
    id: 'stage-04',
    number: '04',
    title: 'Integration',
    description: 'Build out all technical integrations including n8n workflows, CRM connections, and transfer capabilities.',
    tasks: [
      { id: 't112', label: 'Build n8n workflows for end-of-call reports and CRM updates', completed: false },
      { id: 't113', label: "Connect agent to client's CRM to pull dynamic customer data", completed: false },
      { id: 't114', label: 'Push call outcomes and sync status changes in real-time', completed: false },
      { id: 't115', label: 'Set up warm or cold transfer capabilities to live agents', completed: false },
      { id: 't116', label: 'Configure caller ID passthrough for transfers', completed: false },
      { id: 't117', label: 'Set up Google Chat/Slack notifications with client context', completed: false },
    ]
  },
  {
    id: 'stage-05',
    number: '05',
    title: 'Testing',
    tasks: [
      { id: 't118', label: 'Run batch test calls (10-15 minimum)', completed: false },
      { id: 't119', label: 'Review recordings with client', completed: false },
      { id: 't120', label: 'Iterate on prompt adjustments and edge cases', completed: false },
      { id: 't121', label: 'Verify objections and transfers work reliably', completed: false },
    ]
  },
  {
    id: 'stage-06',
    number: '06',
    title: 'ChatDash Dashboard',
    description: 'Provide client access to ChatDash for call logs and recordings, plus configure monitoring and alerting systems.',
    tasks: [
      { id: 't122', label: 'Set up ChatDash access for client', completed: false },
      { id: 't123', label: 'Configure custom reporting dashboards in n8n or Google Sheets', completed: false },
      { id: 't124', label: 'Monitor critical success indicators (IVR navigation, verification, transfers)', completed: false },
      { id: 't125', label: 'Set up automated Slack/Google Chat alerts for failures', completed: false },
      { id: 't126', label: 'Display key performance metrics', completed: false },
    ]
  },
  {
    id: 'stage-07',
    number: '07',
    title: 'Client Feedback',
    tasks: [
      { id: 't127', label: 'Schedule sync calls to review call quality from testing', completed: false },
      { id: 't128', label: 'Address edge cases discovered', completed: false },
      { id: 't129', label: 'Gather client input on agent performance before go-live', completed: false },
    ]
  },
  {
    id: 'stage-08',
    number: '08',
    title: 'Launch',
    tasks: [
      { id: 't130', label: 'Deploy agent to production with initial low-volume rollout (10-20 calls/day)', completed: false },
      { id: 't131', label: 'Monitor closely for the first 48 hours', completed: false },
      { id: 't132', label: 'Maintain async communication channel (Telegram/Slack) for rapid resolution', completed: false },
    ]
  },
  {
    id: 'stage-09',
    number: '09',
    title: 'Post-launch Refinements',
    description: 'Continuously improve agent based on production performance and client feedback.',
    tasks: [
      { id: 't133', label: 'Schedule weekly sync calls during first month to review quality', completed: false },
      { id: 't134', label: 'Monitor alerts and call quality trends via ChatDash', completed: false },
      { id: 't135', label: 'Conduct async reviews of flagged calls', completed: false },
      { id: 't136', label: 'Proactively address pattern shifts', completed: false },
      { id: 't137', label: 'Implement prompt updates based on production learnings', completed: false },
      { id: 't138', label: 'Add new conversation branches for discovered edge cases', completed: false },
      { id: 't139', label: 'Continuously update knowledge bases as client business rules evolve', completed: false },
    ]
  }
];
