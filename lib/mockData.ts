export const mockSummary = {
  cve_count: 11200,
  vulnerability_count: 526810,
  server_count: 155,
};

export const mockEnvironment = [
  { name: 'PROD', value: 172070 },
  { name: 'UAT', value: 163810 },
  { name: 'DevOps', value: 157320 },
  { name: 'DEV', value: 31000 },
  { name: 'BACKUP', value: 7000 },
];

// export const mockSeverityByOS = [
//   { os: 'CentOS', Medium: 50.16, High: 15.12, Critical: 0.01 },
//   { os: 'Windows', Medium: 19.84, High: 9.23, Critical: 0.02 },
//   { os: 'Ubuntu', Medium: 13.16, High: 1.47, Critical: 0.05 },
// ];

// export const mockSeverityData = [
//   { os: 'CentOS', Critical: 10, High: 50, Medium: 80 },
//   { os: 'Windows', Critical: 5, High: 30, Medium: 60 },
//   { os: 'Ubuntu', Critical: 3, High: 12, Medium: 40 },
//   { os: 'Red Hat', Critical: 7, High: 25, Medium: 30 },
//   { os: 'Debian', Critical: 2, High: 8, Medium: 20 },
// ];

export const mockSeverityData = [
  {
    severity: 'Critical',
    CentOS: 0.25,
    Windows: 0.01,
    Ubuntu: 0,
    'Red Hat': 0,
    'Microsoft Server': 0,
  },
  {
    severity: 'Low',
    CentOS: 2.97,
    Windows: 0.05,
    Ubuntu: 0.20,
    'Red Hat': 0,
    'Microsoft Server': 0.11,
  },
  {
    severity: 'High',
    CentOS: 1.74,
    Windows: 1.30,
    Ubuntu: 0,
    'Red Hat': 0,
    'Microsoft Server': 9.23,
  },
  {
    severity: 'Medium',
    CentOS: 15.1,
    Windows: 0.2,
    Ubuntu: 0,
    'Red Hat': 0,
    'Microsoft Server': 50.16,
  },
];



export const mockOwnerTable = [
  { owner: 'M Anwar', critical: 2975, high: 63209, low: 16404, total: 331817 },
  { owner: 'Irfan B', critical: 326, high: 17193, low: 139543, total: 163806 },
  { owner: 'S Irfan', critical: 961, high: 17131, low: 12123, total: 30650 },
];

